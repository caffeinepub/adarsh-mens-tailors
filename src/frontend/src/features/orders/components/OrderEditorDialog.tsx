import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Save, Trash2 } from 'lucide-react';
import { CustomerDetailsSection } from './CustomerDetailsSection';
import { OrderDetailsSection } from './OrderDetailsSection';
import { MeasurementsSection } from './MeasurementsSection';
import { ReadyMessageModal } from './ReadyMessageModal';
import { useLocalOrders } from '../storage';
import { generateOrderId } from '../orderId';
import { calculateRemainingAmount } from '../calculations';
import type { LocalOrder, OrderStatus, ItemType } from '../types';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog';
import { useT } from '../../../i18n/useT';

interface OrderEditorDialogProps {
  open: boolean;
  onClose: () => void;
  order: LocalOrder | null;
}

function createEmptyOrder(): Omit<LocalOrder, 'id' | 'orderId' | 'lastModified' | 'syncStatus'> {
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return {
    customerName: '',
    mobileNumber: '',
    address: '',
    itemType: 'Shirt' as ItemType,
    quantity: 1,
    orderDate: today,
    deliveryDate: nextWeek,
    totalAmount: 0,
    paidAmount: 0,
    remainingAmount: 0,
    status: 'Pending' as OrderStatus,
    upperBody: {
      length: '',
      chest: '',
      waist: '',
      seat: '',
      front: '',
      shoulder: '',
      fullHandCuff: '',
      halfHandLength: '',
      collar: '',
      cutFront: '',
      style: '',
    },
    lowerBody: {
      length: '',
      bottom: '',
      thigh: '',
      knee: '',
      seat: '',
      mode: '',
      frontRiseBackRise: '',
      bottomWidth: '',
      waistHeight: '',
    },
  };
}

export function OrderEditorDialog({ open, onClose, order }: OrderEditorDialogProps) {
  const { addOrder, updateOrder, deleteOrder } = useLocalOrders();
  const { t } = useT();
  const [formData, setFormData] = useState<LocalOrder | null>(null);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [previousStatus, setPreviousStatus] = useState<OrderStatus | null>(null);

  useEffect(() => {
    if (open) {
      if (order) {
        setFormData(order);
        setPreviousStatus(order.status);
      } else {
        const newOrder: LocalOrder = {
          ...createEmptyOrder(),
          id: crypto.randomUUID(),
          orderId: generateOrderId(),
          lastModified: Date.now(),
          syncStatus: 'pending',
        };
        setFormData(newOrder);
        setPreviousStatus(null);
      }
    }
  }, [open, order]);

  const handleSave = () => {
    if (!formData) return;

    // Validation
    if (!formData.customerName.trim()) {
      toast.error(t('customerNameRequired'));
      return;
    }
    if (!formData.mobileNumber.trim()) {
      toast.error(t('mobileNumberRequired'));
      return;
    }

    // Check if status changed to Ready
    const statusChangedToReady = previousStatus !== 'Ready' && formData.status === 'Ready';

    if (order) {
      updateOrder(formData.id, formData);
      toast.success(t('orderUpdated'));
    } else {
      addOrder(formData);
      toast.success(t('orderCreated'));
    }

    if (statusChangedToReady) {
      setShowReadyMessage(true);
    } else {
      onClose();
    }
  };

  const handleDelete = () => {
    if (!formData) return;
    deleteOrder(formData.id);
    toast.success(t('orderDeleted'));
    setShowDeleteConfirm(false);
    onClose();
  };

  const updateFormData = (updates: Partial<LocalOrder>) => {
    if (!formData) return;
    
    const newData = { ...formData, ...updates };
    
    // Auto-calculate remaining amount if total or paid changes
    if ('totalAmount' in updates || 'paidAmount' in updates) {
      newData.remainingAmount = calculateRemainingAmount(newData.totalAmount, newData.paidAmount);
    }
    
    setFormData(newData);
  };

  if (!formData) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-2xl">
              {order ? t('editOrderTitle') : t('newOrderTitle')}
            </DialogTitle>
            {order && (
              <p className="text-sm text-muted-foreground font-mono">{formData.orderId}</p>
            )}
          </DialogHeader>

          <ScrollArea className="flex-1 px-6 py-4" style={{ maxHeight: 'calc(90vh - 180px)' }}>
            <div className="space-y-8">
              <CustomerDetailsSection
                customerName={formData.customerName}
                mobileNumber={formData.mobileNumber}
                address={formData.address}
                onChange={updateFormData}
              />

              <OrderDetailsSection
                orderId={formData.orderId}
                itemType={formData.itemType}
                quantity={formData.quantity}
                orderDate={formData.orderDate}
                deliveryDate={formData.deliveryDate}
                totalAmount={formData.totalAmount}
                paidAmount={formData.paidAmount}
                remainingAmount={formData.remainingAmount}
                status={formData.status}
                onChange={updateFormData}
              />

              <MeasurementsSection
                upperBody={formData.upperBody}
                lowerBody={formData.lowerBody}
                onChange={updateFormData}
              />
            </div>
          </ScrollArea>

          <div className="px-6 py-4 border-t flex items-center justify-between gap-3">
            <div>
              {order && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {t('delete')}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                {t('saveOrder')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ReadyMessageModal
        open={showReadyMessage}
        onClose={() => {
          setShowReadyMessage(false);
          onClose();
        }}
        customerName={formData.customerName}
        mobileNumber={formData.mobileNumber}
      />

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteOrderTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteOrderMessage', { name: formData.customerName })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

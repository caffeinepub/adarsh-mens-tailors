import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { ClipboardList, IndianRupee } from 'lucide-react';
import type { ItemType, OrderStatus } from '../types';
import { useT } from '../../../i18n/useT';

interface OrderDetailsSectionProps {
  orderId: string;
  itemType: ItemType;
  quantity: number;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: OrderStatus;
  onChange: (updates: Partial<{
    itemType: ItemType;
    quantity: number;
    orderDate: string;
    deliveryDate: string;
    totalAmount: number;
    paidAmount: number;
    status: OrderStatus;
  }>) => void;
}

export function OrderDetailsSection({
  orderId,
  itemType,
  quantity,
  orderDate,
  deliveryDate,
  totalAmount,
  paidAmount,
  remainingAmount,
  status,
  onChange,
}: OrderDetailsSectionProps) {
  const { t } = useT();
  
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b">
        <ClipboardList className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">{t('orderDetails')}</h2>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-base">{t('orderId')}</Label>
          <Input
            value={orderId}
            disabled
            className="h-11 bg-muted font-mono"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="itemType" className="text-base">{t('itemType')}</Label>
          <Select value={itemType} onValueChange={(value) => onChange({ itemType: value as ItemType })}>
            <SelectTrigger id="itemType" className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Shirt">{t('itemShirt')}</SelectItem>
              <SelectItem value="Pant">{t('itemPant')}</SelectItem>
              <SelectItem value="Kurta">{t('itemKurta')}</SelectItem>
              <SelectItem value="Suit">{t('itemSuit')}</SelectItem>
              <SelectItem value="Blazer">{t('itemBlazer')}</SelectItem>
              <SelectItem value="Sherwani">{t('itemSherwani')}</SelectItem>
              <SelectItem value="Other">{t('itemOther')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-base">{t('quantity')}</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onChange({ quantity: parseInt(e.target.value) || 1 })}
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="orderDate" className="text-base">{t('orderDate')}</Label>
          <Input
            id="orderDate"
            type="date"
            value={orderDate}
            onChange={(e) => onChange({ orderDate: e.target.value })}
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deliveryDate" className="text-base">{t('deliveryDate')}</Label>
          <Input
            id="deliveryDate"
            type="date"
            value={deliveryDate}
            onChange={(e) => onChange({ deliveryDate: e.target.value })}
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status" className="text-base">{t('orderStatus')}</Label>
          <Select value={status} onValueChange={(value) => onChange({ status: value as OrderStatus })}>
            <SelectTrigger id="status" className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">{t('statusPending')}</SelectItem>
              <SelectItem value="In Progress">{t('statusInProgress')}</SelectItem>
              <SelectItem value="Ready">{t('statusReady')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="totalAmount" className="text-base flex items-center gap-1">
            <IndianRupee className="h-4 w-4" />
            {t('totalAmount')}
          </Label>
          <Input
            id="totalAmount"
            type="number"
            min="0"
            step="0.01"
            value={totalAmount}
            onChange={(e) => onChange({ totalAmount: parseFloat(e.target.value) || 0 })}
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="paidAmount" className="text-base flex items-center gap-1">
            <IndianRupee className="h-4 w-4" />
            {t('paidAmount')}
          </Label>
          <Input
            id="paidAmount"
            type="number"
            min="0"
            step="0.01"
            value={paidAmount}
            onChange={(e) => onChange({ paidAmount: parseFloat(e.target.value) || 0 })}
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-base flex items-center gap-1">
            <IndianRupee className="h-4 w-4" />
            {t('remainingAmount')}
          </Label>
          <Input
            value={remainingAmount.toFixed(2)}
            disabled
            className={`h-11 font-semibold ${remainingAmount > 0 ? 'text-destructive' : 'text-green-600'} bg-muted`}
          />
        </div>
      </div>
    </section>
  );
}

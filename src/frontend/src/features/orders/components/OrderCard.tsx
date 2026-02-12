import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Calendar, Phone, Package, IndianRupee, Edit } from 'lucide-react';
import type { LocalOrder } from '../types';
import { format } from 'date-fns';
import { useT } from '../../../i18n/useT';

interface OrderCardProps {
  order: LocalOrder;
  onEdit: () => void;
}

export function OrderCard({ order, onEdit }: OrderCardProps) {
  const { t } = useT();
  
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Ready': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Pending': return t('statusPending');
      case 'In Progress': return t('statusInProgress');
      case 'Ready': return t('statusReady');
      default: return status;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onEdit}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{order.customerName}</h3>
            <p className="text-sm text-muted-foreground font-mono">{order.orderId}</p>
          </div>
          <Badge className={statusColors[order.status]} variant="secondary">
            {getStatusLabel(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="font-medium">{order.mobileNumber}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span>{order.itemType} × {order.quantity}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span>{t('delivery')}: {format(new Date(order.deliveryDate), 'dd MMM yyyy')}</span>
        </div>
        
        <div className="pt-2 border-t flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{t('remaining')}:</span>
          </div>
          <span className={`font-bold text-lg ${order.remainingAmount > 0 ? 'text-destructive' : 'text-green-600'}`}>
            ₹{order.remainingAmount}
          </span>
        </div>
        
        <Button variant="outline" size="sm" className="w-full gap-2" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
          <Edit className="h-4 w-4" />
          {t('editOrder')}
        </Button>
      </CardContent>
    </Card>
  );
}

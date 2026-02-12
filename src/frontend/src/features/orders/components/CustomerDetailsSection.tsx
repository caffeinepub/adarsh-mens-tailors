import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { User } from 'lucide-react';
import { CustomerWhatsAppReadyAction } from './CustomerWhatsAppReadyAction';
import { useT } from '../../../i18n/useT';

interface CustomerDetailsSectionProps {
  customerName: string;
  mobileNumber: string;
  address: string;
  onChange: (updates: { customerName?: string; mobileNumber?: string; address?: string }) => void;
}

export function CustomerDetailsSection({ customerName, mobileNumber, address, onChange }: CustomerDetailsSectionProps) {
  const { t } = useT();
  
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t('customerDetails')}</h2>
        </div>
        <CustomerWhatsAppReadyAction customerName={customerName} mobileNumber={mobileNumber} />
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customerName" className="text-base">
            {t('customerName')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => onChange({ customerName: e.target.value })}
            placeholder={t('enterCustomerName')}
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mobileNumber" className="text-base">
            {t('mobileNumber')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="mobileNumber"
            type="tel"
            value={mobileNumber}
            onChange={(e) => onChange({ mobileNumber: e.target.value })}
            placeholder={t('enterMobileNumber')}
            className="h-11"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address" className="text-base">
          {t('address')} <span className="text-muted-foreground text-sm">{t('optional')}</span>
        </Label>
        <Textarea
          id="address"
          value={address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder={t('enterAddress')}
          rows={2}
          className="resize-none"
        />
      </div>
    </section>
  );
}

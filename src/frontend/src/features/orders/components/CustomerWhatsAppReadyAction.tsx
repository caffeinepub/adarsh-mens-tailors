import { Button } from '../../../components/ui/button';
import { SiWhatsapp } from 'react-icons/si';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import { getReadyMessageText, getWhatsAppLink } from '../readyMessage';
import { useT } from '../../../i18n/useT';

interface CustomerWhatsAppReadyActionProps {
  customerName: string;
  mobileNumber: string;
}

export function CustomerWhatsAppReadyAction({ customerName, mobileNumber }: CustomerWhatsAppReadyActionProps) {
  const { t } = useT();
  const isDisabled = !mobileNumber || mobileNumber.trim() === '' || !customerName || customerName.trim() === '';

  const handleWhatsApp = () => {
    if (isDisabled) return;
    const messageText = getReadyMessageText(customerName);
    const whatsappLink = getWhatsAppLink(mobileNumber, messageText);
    window.open(whatsappLink, '_blank');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleWhatsApp}
            disabled={isDisabled}
            variant="outline"
            size="sm"
            className="gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/30 text-[#25D366] hover:text-[#20BA5A] disabled:opacity-50 disabled:bg-muted"
          >
            <SiWhatsapp className="h-4 w-4" />
            <span className="hidden sm:inline">{t('sendWhatsApp')}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isDisabled ? t('mobileRequired') : t('whatsAppTooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

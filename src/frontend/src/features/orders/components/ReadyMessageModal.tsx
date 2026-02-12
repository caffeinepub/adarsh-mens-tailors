import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Copy, Check } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { getReadyMessageText, getWhatsAppLink } from '../readyMessage';
import { toast } from 'sonner';
import { useT } from '../../../i18n/useT';

interface ReadyMessageModalProps {
  open: boolean;
  onClose: () => void;
  customerName: string;
  mobileNumber: string;
}

export function ReadyMessageModal({ open, onClose, customerName, mobileNumber }: ReadyMessageModalProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useT();
  const messageText = getReadyMessageText(customerName);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      toast.success(t('messageCopied'));
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error(t('copyFailed'));
    }
  };

  const handleWhatsApp = () => {
    const whatsappLink = getWhatsAppLink(mobileNumber, messageText);
    window.open(whatsappLink, '_blank');
  };

  const isWhatsAppDisabled = !mobileNumber || mobileNumber.trim() === '';

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('orderReady')}</DialogTitle>
          <DialogDescription>
            {t('orderReadyDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="text-sm font-medium text-muted-foreground">{t('messagePreview')}</div>
            <div className="text-sm whitespace-pre-wrap leading-relaxed">
              {messageText}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  {t('copied')}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t('copyMessage')}
                </>
              )}
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="flex-1 gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
              disabled={isWhatsAppDisabled}
            >
              <SiWhatsapp className="h-4 w-4" />
              {t('openWhatsApp')}
            </Button>
          </div>

          {isWhatsAppDisabled && (
            <p className="text-xs text-center text-muted-foreground">
              {t('whatsAppDisabled')}
            </p>
          )}

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full"
          >
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

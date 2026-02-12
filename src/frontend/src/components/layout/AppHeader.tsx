import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { SyncStatusBadge } from '../../features/sync/SyncStatusBadge';
import { LanguageSwitch } from '../i18n/LanguageSwitch';
import { useT } from '../../i18n/useT';

export default function AppHeader() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { t } = useT();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/adarsh-mens-tailors-logo.dim_512x512.png" 
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1 className="text-lg font-bold leading-tight">{t('appName')}</h1>
            <p className="text-xs text-muted-foreground">{t('appSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SyncStatusBadge />
          <LanguageSwitch />
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">{t('signOut')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

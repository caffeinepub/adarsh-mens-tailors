import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ShieldAlert, LogOut } from 'lucide-react';
import { LanguageSwitch } from '../i18n/LanguageSwitch';
import { useT } from '../../i18n/useT';

export default function AccessDeniedScreen() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { t } = useT();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-destructive/5 to-background p-4">
      <Card className="w-full max-w-md shadow-lg border-destructive/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-end">
            <LanguageSwitch />
          </div>
          <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-destructive">{t('accessDeniedTitle')}</CardTitle>
            <CardDescription className="mt-2">
              {t('accessDeniedDescription')}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="mb-2">{t('accessDeniedMessage1')}</p>
            <p>{t('accessDeniedMessage2')}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-11"
            size="lg"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('signOut')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

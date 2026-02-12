import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LogIn } from 'lucide-react';
import { LanguageSwitch } from '../i18n/LanguageSwitch';
import { useT } from '../../i18n/useT';

export default function LoginScreen() {
  const { login, isLoggingIn } = useInternetIdentity();
  const { t } = useT();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-end">
            <LanguageSwitch />
          </div>
          <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <img 
              src="/assets/generated/adarsh-mens-tailors-logo.dim_512x512.png" 
              alt="Adarsh Mens Tailors"
              className="w-20 h-20 object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{t('loginTitle')}</CardTitle>
            <CardDescription className="mt-2">
              {t('loginDescription')}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full h-12 text-base"
            size="lg"
          >
            {isLoggingIn ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('signingIn')}
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" />
                {t('signInButton')}
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            {t('loginFooter')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

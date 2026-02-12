import { useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useAdminGate } from './hooks/useAdminGate';
import { useQueryClient } from '@tanstack/react-query';
import LoginScreen from './components/auth/LoginScreen';
import AccessDeniedScreen from './components/auth/AccessDeniedScreen';
import OrdersListPage from './pages/OrdersListPage';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { useSyncEngine } from './features/sync/useSyncEngine';
import { LanguageProvider } from './i18n/LanguageProvider';
import { clearAllOrders } from './features/orders/storage';

export default function App() {
  const { identity } = useInternetIdentity();
  const { isLoading, isAuthorized, isForbidden } = useAdminGate();
  const { startSync } = useSyncEngine();
  const queryClient = useQueryClient();

  // Start sync engine when authenticated and authorized
  useEffect(() => {
    if (identity && isAuthorized) {
      startSync();
    }
  }, [identity, isAuthorized, startSync]);

  // Clear local data on logout
  useEffect(() => {
    if (!identity) {
      queryClient.clear();
      // Note: We keep local orders for offline work, only clear on explicit logout
    }
  }, [identity, queryClient]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  // Show login screen if not authenticated
  if (!identity) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <LoginScreen />
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  // Show access denied if authenticated but not authorized
  if (isForbidden) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <AccessDeniedScreen />
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  // Show main app if authorized
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <OrdersListPage />
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}

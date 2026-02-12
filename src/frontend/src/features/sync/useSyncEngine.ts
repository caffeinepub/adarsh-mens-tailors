import { useCallback, useEffect, useState, useRef } from 'react';
import { useConnectivity } from './useConnectivity';
import { useActor } from '../../hooks/useActor';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { syncOrders, type SyncResult } from './ordersSync';

type SyncStatus = 'idle' | 'syncing' | 'error';

export function useSyncEngine() {
  const { isOnline } = useConnectivity();
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const syncInProgress = useRef(false);

  const performSync = useCallback(async () => {
    if (syncInProgress.current || !actor || !identity || !isOnline) {
      return;
    }

    syncInProgress.current = true;
    setSyncStatus('syncing');
    setLastError(null);

    try {
      const result: SyncResult = await syncOrders(actor);
      
      if (result.success) {
        setSyncStatus('idle');
        setLastSyncTime(Date.now());
        setLastError(null);
      } else {
        setSyncStatus('error');
        setLastError(result.error || 'Sync failed');
      }
    } catch (error: any) {
      console.error('Sync engine error:', error);
      setSyncStatus('error');
      setLastError(error.message || 'Unknown sync error');
    } finally {
      syncInProgress.current = false;
    }
  }, [actor, identity, isOnline]);

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && actor && identity && syncStatus === 'idle') {
      const timer = setTimeout(() => {
        performSync();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, actor, identity, syncStatus, performSync]);

  // Initial sync on mount when authorized
  useEffect(() => {
    if (actor && identity && isOnline && !syncInProgress.current && lastSyncTime === null) {
      performSync();
    }
  }, [actor, identity, isOnline, lastSyncTime, performSync]);

  const startSync = useCallback(() => {
    if (!syncInProgress.current) {
      performSync();
    }
  }, [performSync]);

  return {
    syncStatus,
    lastSyncTime,
    lastError,
    startSync,
  };
}

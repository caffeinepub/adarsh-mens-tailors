import { Badge } from '../../components/ui/badge';
import { Cloud, CloudOff, RefreshCw, AlertCircle } from 'lucide-react';
import { useConnectivity } from './useConnectivity';
import { useSyncEngine } from './useSyncEngine';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';

export function SyncStatusBadge() {
  const { isOnline } = useConnectivity();
  const { syncStatus, lastError } = useSyncEngine();

  if (!isOnline) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="gap-1.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
              <CloudOff className="h-3 w-3" />
              <span className="hidden sm:inline">Offline</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Working offline - changes will sync when online</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (syncStatus === 'syncing') {
    return (
      <Badge variant="secondary" className="gap-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
        <RefreshCw className="h-3 w-3 animate-spin" />
        <span className="hidden sm:inline">Syncing</span>
      </Badge>
    );
  }

  if (syncStatus === 'error') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="gap-1.5 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              <AlertCircle className="h-3 w-3" />
              <span className="hidden sm:inline">Sync Error</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{lastError || 'Sync failed - will retry when online'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className="gap-1.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <Cloud className="h-3 w-3" />
            <span className="hidden sm:inline">Online</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Connected and synced</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

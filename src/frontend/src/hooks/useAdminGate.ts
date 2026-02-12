import { useInternetIdentity } from './useInternetIdentity';
import { useActor } from './useActor';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useAdminGate() {
  const { identity, isInitializing, clear } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const adminCheckQuery = useQuery({
    queryKey: ['isAdmin', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !!identity && !actorFetching && !isInitializing,
    retry: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const isLoading = isInitializing || actorFetching || (!!identity && adminCheckQuery.isLoading);
  const isAuthorized = !!identity && adminCheckQuery.data === true;
  const isForbidden = !!identity && !actorFetching && adminCheckQuery.isFetched && adminCheckQuery.data === false;

  // Clear sync state on logout
  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    isLoading,
    isAuthorized,
    isForbidden,
    logout: handleLogout,
  };
}

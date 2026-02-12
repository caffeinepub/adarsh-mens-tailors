import { useState, useEffect, useCallback } from 'react';
import type { LocalOrder } from './types';

const STORAGE_KEY = 'adarsh_tailors_orders';

function loadOrders(): LocalOrder[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const orders = JSON.parse(stored);
    // Filter out tombstones for display
    return orders.filter((order: LocalOrder) => !order.pendingDelete);
  } catch (error) {
    console.error('Failed to load orders:', error);
    return [];
  }
}

function loadAllOrders(): LocalOrder[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load orders:', error);
    return [];
  }
}

function saveOrders(orders: LocalOrder[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders:', error);
  }
}

export function useLocalOrders() {
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = loadOrders();
    setOrders(loaded);
    setIsLoading(false);
  }, []);

  const addOrder = useCallback((order: LocalOrder) => {
    setOrders(prev => {
      const allOrders = loadAllOrders();
      const updated = [...allOrders, order];
      saveOrders(updated);
      return [...prev, order];
    });
  }, []);

  const updateOrder = useCallback((id: string, updates: Partial<LocalOrder>) => {
    setOrders(prev => {
      const allOrders = loadAllOrders();
      const updated = allOrders.map(order => 
        order.id === id 
          ? { ...order, ...updates, lastModified: Date.now(), syncStatus: 'pending' as const }
          : order
      );
      saveOrders(updated);
      return prev.map(order => 
        order.id === id 
          ? { ...order, ...updates, lastModified: Date.now(), syncStatus: 'pending' as const }
          : order
      );
    });
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders(prev => {
      const allOrders = loadAllOrders();
      const updated = allOrders.map(order => 
        order.id === id 
          ? { ...order, pendingDelete: true, lastModified: Date.now(), syncStatus: 'pending' as const }
          : order
      );
      saveOrders(updated);
      return prev.filter(order => order.id !== id);
    });
  }, []);

  const getOrder = useCallback((id: string): LocalOrder | undefined => {
    return orders.find(order => order.id === id);
  }, [orders]);

  return {
    orders,
    isLoading,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder,
  };
}

// Helper functions for sync engine
export function getPendingChanges(): LocalOrder[] {
  const allOrders = loadAllOrders();
  return allOrders.filter(order => order.syncStatus === 'pending');
}

export function markOrderSynced(localId: string, backendId: bigint): void {
  const allOrders = loadAllOrders();
  const updated = allOrders.map(order => 
    order.id === localId 
      ? { ...order, syncStatus: 'synced' as const, backendId, lastSyncError: undefined }
      : order
  );
  saveOrders(updated);
}

export function markOrderError(localId: string, error: string): void {
  const allOrders = loadAllOrders();
  const updated = allOrders.map(order => 
    order.id === localId 
      ? { ...order, syncStatus: 'error' as const, lastSyncError: error }
      : order
  );
  saveOrders(updated);
}

export function removeTombstone(localId: string): void {
  const allOrders = loadAllOrders();
  const updated = allOrders.filter(order => order.id !== localId);
  saveOrders(updated);
}

export function mergeBackendOrders(backendOrders: Array<{ id: bigint; [key: string]: any }>): void {
  const allOrders = loadAllOrders();
  const backendIds = new Set(backendOrders.map(o => o.id.toString()));
  
  // Keep local orders that don't have backend IDs yet or have pending changes
  const localOnlyOrders = allOrders.filter(order => 
    !order.backendId || order.syncStatus === 'pending'
  );
  
  // Update existing orders from backend
  const updatedOrders = localOnlyOrders.map(localOrder => {
    if (!localOrder.backendId) return localOrder;
    
    const backendOrder = backendOrders.find(bo => bo.id === localOrder.backendId);
    if (!backendOrder) return localOrder;
    
    // If local has pending changes, keep local version
    if (localOrder.syncStatus === 'pending') return localOrder;
    
    // Otherwise update from backend (not implemented in this phase as backend structure differs)
    return localOrder;
  });
  
  saveOrders(updatedOrders);
}

export function clearAllOrders(): void {
  localStorage.removeItem(STORAGE_KEY);
}

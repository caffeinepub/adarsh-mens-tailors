import { useState } from 'react';
import AppHeader from '../components/layout/AppHeader';
import { Button } from '../components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLocalOrders } from '../features/orders/storage';
import { OrderCard } from '../features/orders/components/OrderCard';
import { OrderEditorDialog } from '../features/orders/components/OrderEditorDialog';
import type { LocalOrder } from '../features/orders/types';
import { useT } from '../i18n/useT';

export default function OrdersListPage() {
  const { orders, isLoading } = useLocalOrders();
  const { t } = useT();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<LocalOrder | null>(null);

  const handleCreateNew = () => {
    setEditingOrder(null);
    setIsEditorOpen(true);
  };

  const handleEditOrder = (order: LocalOrder) => {
    setEditingOrder(order);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingOrder(null);
  };

  // Filter orders (excluding tombstones)
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.mobileNumber.includes(searchQuery) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort by delivery date (earliest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] h-11">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('filterStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allOrders')}</SelectItem>
                <SelectItem value="Pending">{t('statusPending')}</SelectItem>
                <SelectItem value="In Progress">{t('statusInProgress')}</SelectItem>
                <SelectItem value="Ready">{t('statusReady')}</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreateNew} size="lg" className="h-11 gap-2">
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">{t('newOrder')}</span>
            </Button>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t('loadingOrders')}</p>
          </div>
        ) : sortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <img 
              src="/assets/generated/empty-orders-illustration.dim_1200x800.png"
              alt="No orders"
              className="mx-auto w-full max-w-md mb-6 opacity-80"
            />
            <h3 className="text-xl font-semibold mb-2">{t('noOrdersFound')}</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? t('adjustFilters')
                : t('createFirstOrder')}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button onClick={handleCreateNew} size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                {t('createFirstOrderButton')}
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onEdit={() => handleEditOrder(order)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Order Editor Dialog */}
      <OrderEditorDialog
        open={isEditorOpen}
        onClose={handleCloseEditor}
        order={editingOrder}
      />
    </div>
  );
}

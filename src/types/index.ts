export interface Order {
  id: string;
  customerName: string;
  product: string;
  quantity: number;
  value: number;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  deliveryRating: number;
  totalOrders: number;
  onTimeDeliveries: number;
  location: string;
  status: 'active' | 'inactive';
}

export interface StockItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  lastUpdated: string;
  supplier: string;
}

export interface DashboardMetrics {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  lowStockItems: number;
  activeSuppliers: number;
}

export interface ChartData {
  month: string;
  supply: number;
  demand: number;
  sales: number;
}
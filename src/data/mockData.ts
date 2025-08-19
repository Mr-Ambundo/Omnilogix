import { Order, Supplier, StockItem, DashboardMetrics, ChartData } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Acme Corporation',
    product: 'Industrial Widgets',
    quantity: 500,
    value: 12500,
    status: 'in-progress',
    orderDate: '2025-01-10',
    deliveryDate: '2025-01-20',
    priority: 'high'
  },
  {
    id: 'ORD-002',
    customerName: 'TechFlow Industries',
    product: 'Electronic Components',
    quantity: 250,
    value: 8750,
    status: 'pending',
    orderDate: '2025-01-12',
    deliveryDate: '2025-01-25',
    priority: 'medium'
  },
  {
    id: 'ORD-003',
    customerName: 'Global Manufacturing',
    product: 'Steel Parts',
    quantity: 1000,
    value: 25000,
    status: 'completed',
    orderDate: '2025-01-05',
    deliveryDate: '2025-01-15',
    priority: 'high'
  },
  {
    id: 'ORD-004',
    customerName: 'Smart Solutions Ltd',
    product: 'Software Licenses',
    quantity: 100,
    value: 5000,
    status: 'pending',
    orderDate: '2025-01-14',
    deliveryDate: '2025-01-28',
    priority: 'low'
  },
  {
    id: 'ORD-005',
    customerName: 'ProBuild Construction',
    product: 'Construction Materials',
    quantity: 750,
    value: 18000,
    status: 'in-progress',
    orderDate: '2025-01-08',
    deliveryDate: '2025-01-22',
    priority: 'high'
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Premier Components Inc.',
    contact: 'Sarah Johnson',
    email: 'sarah.johnson@premiercomp.com',
    phone: '+1 (555) 123-4567',
    deliveryRating: 4.8,
    totalOrders: 245,
    onTimeDeliveries: 228,
    location: 'Chicago, IL',
    status: 'active'
  },
  {
    id: 'SUP-002',
    name: 'Global Supply Chain Co.',
    contact: 'Michael Chen',
    email: 'michael.chen@globalsupply.com',
    phone: '+1 (555) 234-5678',
    deliveryRating: 4.6,
    totalOrders: 189,
    onTimeDeliveries: 175,
    location: 'Los Angeles, CA',
    status: 'active'
  },
  {
    id: 'SUP-003',
    name: 'TechParts Direct',
    contact: 'Emily Rodriguez',
    email: 'emily.rodriguez@techparts.com',
    phone: '+1 (555) 345-6789',
    deliveryRating: 4.9,
    totalOrders: 312,
    onTimeDeliveries: 298,
    location: 'Austin, TX',
    status: 'active'
  },
  {
    id: 'SUP-004',
    name: 'Industrial Materials LLC',
    contact: 'David Thompson',
    email: 'david.thompson@indmaterials.com',
    phone: '+1 (555) 456-7890',
    deliveryRating: 4.3,
    totalOrders: 156,
    onTimeDeliveries: 142,
    location: 'Detroit, MI',
    status: 'active'
  },
  {
    id: 'SUP-005',
    name: 'Quality Components Ltd',
    contact: 'Lisa Wang',
    email: 'lisa.wang@qualitycomp.com',
    phone: '+1 (555) 567-8901',
    deliveryRating: 4.7,
    totalOrders: 203,
    onTimeDeliveries: 189,
    location: 'Seattle, WA',
    status: 'inactive'
  }
];

export const mockStockItems: StockItem[] = [
  {
    id: 'STK-001',
    name: 'Industrial Widgets',
    currentStock: 150,
    minStock: 100,
    maxStock: 500,
    unit: 'pieces',
    lastUpdated: '2025-01-15T10:30:00Z',
    supplier: 'Premier Components Inc.'
  },
  {
    id: 'STK-002',
    name: 'Electronic Components',
    currentStock: 75,
    minStock: 100,
    maxStock: 300,
    unit: 'pieces',
    lastUpdated: '2025-01-15T09:15:00Z',
    supplier: 'TechParts Direct'
  },
  {
    id: 'STK-003',
    name: 'Steel Parts',
    currentStock: 200,
    minStock: 50,
    maxStock: 400,
    unit: 'kg',
    lastUpdated: '2025-01-15T11:45:00Z',
    supplier: 'Industrial Materials LLC'
  },
  {
    id: 'STK-004',
    name: 'Construction Materials',
    currentStock: 45,
    minStock: 80,
    maxStock: 250,
    unit: 'm³',
    lastUpdated: '2025-01-15T08:20:00Z',
    supplier: 'Quality Components Ltd'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalOrders: 1247,
  pendingOrders: 43,
  completedOrders: 1189,
  totalRevenue: 2845000,
  lowStockItems: 3,
  activeSuppliers: 12
};

export const mockChartData: ChartData[] = [
  { month: 'Jul', supply: 2400, demand: 2100, sales: 1900 },
  { month: 'Aug', supply: 2300, demand: 2300, sales: 2200 },
  { month: 'Sep', supply: 2600, demand: 2500, sales: 2400 },
  { month: 'Oct', supply: 2200, demand: 2400, sales: 2100 },
  { month: 'Nov', supply: 2800, demand: 2600, sales: 2500 },
  { month: 'Dec', supply: 3000, demand: 2800, sales: 2700 },
  { month: 'Jan', supply: 2900, demand: 2900, sales: 2800 }
];
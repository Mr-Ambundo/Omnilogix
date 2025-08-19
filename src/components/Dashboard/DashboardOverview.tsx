import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Users,
  CheckCircle
} from 'lucide-react';
import MetricCard from './MetricCard';
import { mockDashboardMetrics, mockChartData, mockStockItems } from '../../data/mockData';

const DashboardOverview: React.FC = () => {
  const lowStockItems = mockStockItems.filter(item => item.currentStock < item.minStock);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Orders"
          value={mockDashboardMetrics.totalOrders.toLocaleString()}
          change="+12% from last month"
          changeType="positive"
          icon={Package}
          color="primary"
        />
        <MetricCard
          title="Pending Orders"
          value={mockDashboardMetrics.pendingOrders}
          change="-5% from last week"
          changeType="positive"
          icon={TrendingUp}
          color="warning"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${(mockDashboardMetrics.totalRevenue / 1000000).toFixed(1)}M`}
          change="+18% from last month"
          changeType="positive"
          icon={DollarSign}
          color="success"
        />
        <MetricCard
          title="Low Stock Items"
          value={lowStockItems.length}
          change="Requires attention"
          changeType="negative"
          icon={AlertTriangle}
          color="danger"
        />
        <MetricCard
          title="Active Suppliers"
          value={mockDashboardMetrics.activeSuppliers}
          change="All operational"
          changeType="positive"
          icon={Users}
          color="primary"
        />
        <MetricCard
          title="Completed Orders"
          value={mockDashboardMetrics.completedOrders.toLocaleString()}
          change="+8% completion rate"
          changeType="positive"
          icon={CheckCircle}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supply vs Demand Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="supply" 
                stroke="#7C3AED" 
                strokeWidth={3}
                dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#7C3AED', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="demand" 
                stroke="#94A3B8" 
                strokeWidth={3}
                dot={{ fill: '#94A3B8', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#94A3B8', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="#7C3AED"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Alerts</h3>
        <div className="space-y-3">
          {lowStockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="text-red-500" size={20} />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-silver-600">Current: {item.currentStock} {item.unit} | Min: {item.minStock} {item.unit}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Reorder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
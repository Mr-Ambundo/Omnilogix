import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Target } from 'lucide-react';
import { mockChartData, mockSuppliers } from '../../data/mockData';

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i} className="text-yellow-400">★</span>);
  }
  
  if (hasHalfStar) {
    stars.push(<span key="half" className="text-yellow-400">☆</span>);
  }
  
  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
  }
  
  return stars;
};

const AnalyticsInsights: React.FC = () => {
  const currentMonth = mockChartData[mockChartData.length - 1];
  const previousMonth = mockChartData[mockChartData.length - 2];
  
  const salesGrowth = ((currentMonth.sales - previousMonth.sales) / previousMonth.sales) * 100;
  const demandGrowth = ((currentMonth.demand - previousMonth.demand) / previousMonth.demand) * 100;

  const predictedData = [
    ...mockChartData,
    { month: 'Feb', supply: 3100, demand: 3000, sales: 2900 },
    { month: 'Mar', supply: 3200, demand: 3100, sales: 3000 },
    { month: 'Apr', supply: 3300, demand: 3200, sales: 3100 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
        
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-silver-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-silver-600">Sales Growth</p>
              <p className="text-2xl font-bold text-gray-900">{salesGrowth.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-silver-600">Demand Change</p>
              <p className="text-2xl font-bold text-gray-900">{demandGrowth.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-silver-600">Supply Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Target className="text-primary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-silver-600">Cost Reduction</p>
              <p className="text-2xl font-bold text-gray-900">-8.5%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingDown className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales vs Supply Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={mockChartData}>
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
              dataKey="supply" 
              fill="#94A3B8"
              radius={[4, 4, 0, 0]}
              name="Supply"
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#7C3AED" 
              strokeWidth={3}
              dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
              name="Sales"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Demand Prediction (Next 3 Months)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={predictedData}>
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
            <Area
              type="monotone"
              dataKey="demand"
              stroke="#7C3AED"
              fill="#7C3AED"
              fillOpacity={0.1}
              strokeWidth={2}
              name="Predicted Demand"
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#94A3B8" 
              strokeWidth={2}
              dot={{ fill: '#94A3B8', strokeWidth: 2, r: 3 }}
              name="Historical Sales"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Insight:</strong> Demand is projected to increase by 12% over the next quarter. 
            Consider increasing supply capacity to meet growing demand.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Suppliers</h3>
          <div className="space-y-4">
            {mockSuppliers
              .sort((a, b) => b.deliveryRating - a.deliveryRating)
              .slice(0, 5)
              .map((supplier, index) => (
              <div key={supplier.id} className="flex items-center justify-between p-3 bg-silver-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                    <div className="flex items-center space-x-1">
                      {renderStars(supplier.deliveryRating)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{supplier.deliveryRating.toFixed(1)}</p>
                  <p className="text-xs text-silver-600">Rating</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-silver-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-700">Order Fulfillment Rate</p>
                <p className="text-2xl font-bold text-green-900">96.8%</p>
              </div>
              <TrendingUp className="text-green-600" size={24} />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-700">Average Delivery Time</p>
                <p className="text-2xl font-bold text-blue-900">4.2 days</p>
              </div>
              <Target className="text-blue-600" size={24} />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-purple-700">Supply Chain Efficiency</p>
                <p className="text-2xl font-bold text-purple-900">89.1%</p>
              </div>
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsInsights;
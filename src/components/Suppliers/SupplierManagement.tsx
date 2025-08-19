import React, { useState } from 'react';
import { Search, Star, Phone, Mail, MapPin, MoreHorizontal } from 'lucide-react';
import { mockSuppliers } from '../../data/mockData';
import { Supplier } from '../../types';

const SupplierManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-silver-300'}
      />
    ));
  };

  const getStatusColor = (status: Supplier['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-silver-100 text-silver-800 border-silver-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Supplier Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-400" size={16} />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-silver-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-64"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-silver-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            Add Supplier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow-sm border border-silver-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{supplier.name}</h3>
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(supplier.deliveryRating)}
                  <span className="text-sm text-silver-600 ml-2">
                    {supplier.deliveryRating.toFixed(1)}
                  </span>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(supplier.status)}`}>
                  {supplier.status}
                </span>
              </div>
              <button className="p-1 text-silver-400 hover:text-primary-600 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={16} className="text-silver-400" />
                <span className="text-silver-700">{supplier.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Mail size={16} className="text-silver-400" />
                <a href={`mailto:${supplier.email}`} className="text-primary-600 hover:text-primary-700">
                  {supplier.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Phone size={16} className="text-silver-400" />
                <span className="text-silver-700">{supplier.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-silver-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{supplier.totalOrders}</p>
                  <p className="text-xs text-silver-600">Total Orders</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {((supplier.onTimeDeliveries / supplier.totalOrders) * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-silver-600">On-Time Rate</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-silver-500 text-lg">No suppliers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;
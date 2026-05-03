import { useState, useEffect } from 'react';
import type { Supplier } from '@repo/types';

const MOCK_SUPPLIERS: Supplier[] = [
  { id: '1', name: 'AudioTech Global', contactPerson: 'Michael Chen', email: 'mchen@audiotech.com', phone: '+1-555-0101', address: '400 Tech Park, Shenzhen, China', status: 'active', rating: 5, totalOrders: 24, createdAt: '2024-01-10T08:00:00Z' },
  { id: '2', name: 'ErgoFurniture Co', contactPerson: 'Sarah Williams', email: 'swilliams@ergofurniture.com', phone: '+1-555-0202', address: '88 Industrial Blvd, Stockholm, Sweden', status: 'active', rating: 4, totalOrders: 15, createdAt: '2024-02-20T09:00:00Z' },
  { id: '3', name: 'TechPeripherals Inc', contactPerson: 'John Park', email: 'jpark@techperipherals.com', phone: '+1-555-0303', address: '200 Silicon Ave, Taipei, Taiwan', status: 'active', rating: 4, totalOrders: 31, createdAt: '2024-01-05T10:00:00Z' },
  { id: '4', name: 'HomeGoods Direct', contactPerson: 'Emily Davis', email: 'edavis@homegoodsdirect.com', phone: '+1-555-0404', address: '12 Warehouse Row, Chicago, IL', status: 'active', rating: 3, totalOrders: 8, createdAt: '2024-04-01T11:00:00Z' },
  { id: '5', name: 'SmartHome Solutions', contactPerson: 'David Lee', email: 'dlee@smarthomesolutions.com', phone: '+1-555-0505', address: '600 Innovation Dr, Seoul, South Korea', status: 'active', rating: 5, totalOrders: 19, createdAt: '2024-03-15T09:00:00Z' },
  { id: '6', name: 'SportGear Wholesale', contactPerson: 'Lisa Thompson', email: 'lthompson@sportgear.com', phone: '+1-555-0606', address: '900 Commerce Way, Los Angeles, CA', status: 'inactive', rating: 3, totalOrders: 5, createdAt: '2024-05-01T08:00:00Z' },
];

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuppliers(MOCK_SUPPLIERS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { suppliers, loading };
};

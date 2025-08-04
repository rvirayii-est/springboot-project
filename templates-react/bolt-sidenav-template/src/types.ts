export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'delivery';
}

export interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  stock: number;
  minStock: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryRider?: string;
  createdAt: string;
  deliveredAt?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  orderId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  date: string;
  paymentMethod: 'cash' | 'card' | 'online';
}

export interface Delivery {
  id: string;
  orderId: string;
  riderId: string;
  riderName: string;
  customerName: string;
  customerAddress: string;
  status: 'assigned' | 'picked-up' | 'in-transit' | 'delivered';
  assignedAt: string;
  deliveredAt?: string;
}
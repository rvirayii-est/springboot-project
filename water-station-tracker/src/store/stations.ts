import { create } from "zustand";
import { deliveries, drivers, inventory, orders, stations, customers } from "../mock/data";
import type { Delivery, Driver, InventoryItem, Order, Station, Customer, ID } from "../types";

interface StationState {
  stations: Station[];
  customers: Customer[];
  drivers: Driver[];
  orders: Order[];
  deliveries: Delivery[];
  inventory: InventoryItem[];

  // derived helpers
  stationById: (id: ID) => Station | undefined;
  ordersByStation: (id: ID) => Order[];
  deliveriesByStation: (id: ID) => Delivery[];
  inventoryByStation: (id: ID) => InventoryItem[];

  // sample actions
  addOrder: (o: Order) => void;
  updateOrderStatus: (id: ID, status: Order["status"]) => void;
  updateDeliveryStatus: (id: ID, status: Delivery["status"]) => void;
}

export const useStationStore = create<StationState>((set, get) => ({
  stations,
  customers,
  drivers,
  orders,
  deliveries,
  inventory,

  stationById: (id) => get().stations.find(s => s.id === id),
  ordersByStation: (id) => get().orders.filter(o => o.stationId === id),
  deliveriesByStation: (id) => get().deliveries.filter(d => d.stationId === id),
  inventoryByStation: (id) => get().inventory.filter(i => i.stationId === id),

  addOrder: (o) => set(state => ({ orders: [o, ...state.orders] })),
  updateOrderStatus: (id, status) =>
    set(state => ({ orders: state.orders.map(o => o.id === id ? { ...o, status } : o) })),
  updateDeliveryStatus: (id, status) =>
    set(state => ({ deliveries: state.deliveries.map(d => d.id === id ? { ...d, status } : d) })),
}));

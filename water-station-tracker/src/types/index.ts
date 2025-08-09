export type ID = string;

export interface Station {
  id: ID;
  name: string;
  code: string;               // e.g. WST-001
  location: string;
  capacityLiters: number;
  currentLevelLiters: number; // current tank level
  dailyProductionLiters: number;
  lastQualityCheck: string;   // ISO date
  status: "operational" | "maintenance" | "offline";
}

export interface Customer {
  id: ID;
  name: string;
  address: string;
  phone?: string;
}

export interface Driver {
  id: ID;
  name: string;
  plateNumber: string;
}

export interface Order {
  id: ID;
  stationId: ID;
  customerId: ID;
  date: string;               // ISO
  itemsLiters: number;        // how many liters ordered
  status: "pending" | "preparing" | "out-for-delivery" | "delivered" | "cancelled";
}

export interface Delivery {
  id: ID;
  stationId: ID;
  orderId: ID;
  driverId: ID;
  scheduledAt: string;        // ISO
  deliveredAt?: string;       // ISO
  status: "scheduled" | "in-transit" | "delivered" | "failed";
}

export interface InventoryItem {
  id: ID;
  stationId: ID;
  name: string;               // e.g., "19L Bottles", "Seals", "Filters"
  qty: number;
  unit: string;               // "pcs", "rolls"
  minQty: number;             // reorder threshold
}

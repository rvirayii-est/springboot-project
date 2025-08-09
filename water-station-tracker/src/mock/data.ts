import type { Delivery, Driver, InventoryItem, Order, Station, Customer } from "../types";

export const stations: Station[] = [
  {
    id: "stn_001",
    name: "Aurora Water Hub",
    code: "WST-001",
    location: "Aurora Blvd, Quezon City",
    capacityLiters: 10000,
    currentLevelLiters: 6200,
    dailyProductionLiters: 3500,
    lastQualityCheck: "2025-08-07T08:30:00+08:00",
    status: "operational",
  },
  {
    id: "stn_002",
    name: "Laguna Refill Center",
    code: "WST-002",
    location: "Biñan, Laguna",
    capacityLiters: 8000,
    currentLevelLiters: 2400,
    dailyProductionLiters: 2800,
    lastQualityCheck: "2025-08-06T09:00:00+08:00",
    status: "maintenance",
  },
  {
    id: "stn_003",
    name: "Cavite PureFlow",
    code: "WST-003",
    location: "Dasmariñas, Cavite",
    capacityLiters: 12000,
    currentLevelLiters: 10400,
    dailyProductionLiters: 4200,
    lastQualityCheck: "2025-08-08T10:15:00+08:00",
    status: "operational",
  },
];

export const customers: Customer[] = [
  { id: "cus_001", name: "Green Grocer Mart", address: "QC", phone: "0917-111-1111" },
  { id: "cus_002", name: "Cafe Timplado",     address: "Makati", phone: "0917-222-2222" },
  { id: "cus_003", name: "Sunnyvale Condo",   address: "Taguig", phone: "0917-333-3333" },
];

export const drivers: Driver[] = [
  { id: "drv_001", name: "Rico Santos", plateNumber: "NAA 1234" },
  { id: "drv_002", name: "Jomar Reyes", plateNumber: "NBB 5678" },
];

export const orders: Order[] = [
  { id: "ord_001", stationId: "stn_001", customerId: "cus_001", date: "2025-08-08T09:40:00+08:00", itemsLiters: 380, status: "pending" },
  { id: "ord_002", stationId: "stn_003", customerId: "cus_003", date: "2025-08-08T11:15:00+08:00", itemsLiters: 760, status: "preparing" },
  { id: "ord_003", stationId: "stn_002", customerId: "cus_002", date: "2025-08-07T16:00:00+08:00", itemsLiters: 190, status: "delivered" },
];

export const deliveries: Delivery[] = [
  { id: "del_001", stationId: "stn_003", orderId: "ord_002", driverId: "drv_002", scheduledAt: "2025-08-09T13:00:00+08:00", status: "scheduled" },
  { id: "del_002", stationId: "stn_001", orderId: "ord_001", driverId: "drv_001", scheduledAt: "2025-08-09T10:00:00+08:00", status: "scheduled" },
];

export const inventory: InventoryItem[] = [
  { id: "inv_001", stationId: "stn_001", name: "19L Bottles", qty: 210, unit: "pcs", minQty: 150 },
  { id: "inv_002", stationId: "stn_001", name: "Seals",       qty: 1200, unit: "pcs", minQty: 1000 },
  { id: "inv_003", stationId: "stn_002", name: "Filters",     qty: 12, unit: "pcs", minQty: 8 },
  { id: "inv_004", stationId: "stn_003", name: "19L Bottles", qty: 540, unit: "pcs", minQty: 200 },
];

export const INVENTORY_CATEGORIES = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Accessories" },
  { id: 3, name: "Furniture" },
  { id: 4, name: "Office Supplies" },
];

export const STORAGE_LOCATIONS = [
  { id: 1, name: "Warehouse A" },
  { id: 2, name: "Warehouse B" },
  { id: 3, name: "Office Storage" },
  { id: 4, name: "Front Shelf" },
];

export const USER_ROLES = [
  { value: "admin", label: "Administrator" },
  { value: "staff", label: "Staff" },
];

export const LOW_STOCK_THRESHOLD = 10; // Default threshold

export const ROUTES = {
  DASHBOARD: "/dashboard",
  INVENTORY: "/inventory",
  ORDERS: "/orders",
  SUPPLIERS: "/suppliers",
  REPORTS: "/reports",
  SETTINGS: "/settings",
};

export const NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, label: "Dashboard", icon: "dashboard" },
  { path: ROUTES.INVENTORY, label: "Inventory", icon: "inventory_2" },
  { path: ROUTES.ORDERS, label: "Orders", icon: "shopping_cart" },
  { path: ROUTES.SUPPLIERS, label: "Suppliers", icon: "local_shipping" },
  { path: ROUTES.REPORTS, label: "Reports", icon: "bar_chart" },
  { path: ROUTES.SETTINGS, label: "Settings", icon: "settings" },
];

export const MOBILE_BOTTOM_NAV = [
  { path: ROUTES.DASHBOARD, label: "Dashboard", icon: "dashboard" },
  { path: ROUTES.INVENTORY, label: "Inventory", icon: "inventory_2" },
  { path: ROUTES.ORDERS, label: "Orders", icon: "shopping_cart" },
  { path: "/more", label: "More", icon: "more_horiz" },
];

export const DEFAULT_PAGINATION_LIMIT = 20;

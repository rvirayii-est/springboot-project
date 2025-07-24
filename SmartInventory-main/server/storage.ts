import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  locations, type Location, type InsertLocation,
  inventoryItems, type InventoryItem, type InsertInventoryItem, type UpdateInventoryItem, type InventoryItemWithDetails
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Location operations
  getLocations(): Promise<Location[]>;
  getLocationById(id: number): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  
  // Inventory operations
  getInventoryItems(): Promise<InventoryItemWithDetails[]>;
  getInventoryItemById(id: number): Promise<InventoryItemWithDetails | undefined>;
  getInventoryItemBySku(sku: string): Promise<InventoryItemWithDetails | undefined>;
  createInventoryItem(item: InsertInventoryItem): Promise<InventoryItem>;
  updateInventoryItem(id: number, item: UpdateInventoryItem): Promise<InventoryItem | undefined>;
  deleteInventoryItem(id: number): Promise<boolean>;
  
  // Dashboard operations
  getLowStockItems(): Promise<InventoryItemWithDetails[]>;
  getRecentlyUpdatedItems(limit: number): Promise<InventoryItemWithDetails[]>;
  getInventorySummary(): Promise<{ 
    totalItems: number; 
    lowStockCount: number; 
    totalValue: number;
    openOrders: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private locations: Map<number, Location>;
  private inventoryItems: Map<number, InventoryItem>;
  private userIdCounter: number;
  private categoryIdCounter: number;
  private locationIdCounter: number;
  private inventoryIdCounter: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.locations = new Map();
    this.inventoryItems = new Map();
    
    this.userIdCounter = 1;
    this.categoryIdCounter = 1;
    this.locationIdCounter = 1;
    this.inventoryIdCounter = 1;
    
    // Add default admin user
    this.createUser({ 
      username: "admin", 
      password: "admin123", 
      name: "Admin User",
      role: "admin" 
    });
    
    // Add default staff user
    this.createUser({ 
      username: "staff", 
      password: "staff123", 
      name: "Staff User",
      role: "staff" 
    });
    
    // Add default categories
    const categories = ["Electronics", "Accessories", "Furniture", "Office Supplies"];
    categories.forEach(cat => this.createCategory({ name: cat }));
    
    // Add default locations
    const locations = ["Warehouse A", "Warehouse B", "Office Storage", "Front Shelf"];
    locations.forEach(loc => this.createLocation({ name: loc }));
    
    // Add sample inventory items for testing
    this.createInventoryItem({
      name: "Wireless Keyboard",
      sku: "KB-WL001",
      description: "Bluetooth wireless keyboard",
      categoryId: 1,
      locationId: 1,
      quantity: 24,
      price: 45.99,
      lowStockThreshold: 10,
      barcode: "123456789012"
    });
    
    this.createInventoryItem({
      name: "USB-C Cable",
      sku: "CA-UC100",
      description: "USB-C to USB-A charging cable",
      categoryId: 2,
      locationId: 4,
      quantity: 8,
      price: 12.50,
      lowStockThreshold: 15,
      barcode: "223456789012"
    });
    
    this.createInventoryItem({
      name: "Desk Lamp",
      sku: "LT-DK220",
      description: "Adjustable LED desk lamp",
      categoryId: 3,
      locationId: 3,
      quantity: 32,
      price: 29.99,
      lowStockThreshold: 10,
      barcode: "323456789012"
    });
    
    this.createInventoryItem({
      name: "Wireless Mouse",
      sku: "MS-WL200",
      description: "Wireless optical mouse",
      categoryId: 1,
      locationId: 4,
      quantity: 5,
      price: 22.99,
      lowStockThreshold: 8,
      barcode: "423456789012"
    });
    
    this.createInventoryItem({
      name: "HDMI Adapter",
      sku: "AD-HD001",
      description: "HDMI to USB-C adapter",
      categoryId: 2,
      locationId: 2,
      quantity: 3,
      price: 18.50,
      lowStockThreshold: 10,
      barcode: "523456789012"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  // Location operations
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }
  
  async getLocationById(id: number): Promise<Location | undefined> {
    return this.locations.get(id);
  }
  
  async createLocation(location: InsertLocation): Promise<Location> {
    const id = this.locationIdCounter++;
    const newLocation: Location = { ...location, id };
    this.locations.set(id, newLocation);
    return newLocation;
  }
  
  // Inventory operations
  async getInventoryItems(): Promise<InventoryItemWithDetails[]> {
    return Array.from(this.inventoryItems.values()).map(item => 
      this.enrichInventoryItem(item)
    );
  }
  
  async getInventoryItemById(id: number): Promise<InventoryItemWithDetails | undefined> {
    const item = this.inventoryItems.get(id);
    if (!item) return undefined;
    return this.enrichInventoryItem(item);
  }
  
  async getInventoryItemBySku(sku: string): Promise<InventoryItemWithDetails | undefined> {
    const item = Array.from(this.inventoryItems.values()).find(
      (item) => item.sku === sku
    );
    if (!item) return undefined;
    return this.enrichInventoryItem(item);
  }
  
  async createInventoryItem(item: InsertInventoryItem): Promise<InventoryItem> {
    const id = this.inventoryIdCounter++;
    const now = new Date();
    const newItem: InventoryItem = { 
      ...item, 
      id,
      lastUpdated: now,
      createdAt: now
    };
    this.inventoryItems.set(id, newItem);
    return newItem;
  }
  
  async updateInventoryItem(id: number, updates: UpdateInventoryItem): Promise<InventoryItem | undefined> {
    const existingItem = this.inventoryItems.get(id);
    if (!existingItem) return undefined;
    
    const updatedItem: InventoryItem = { 
      ...existingItem, 
      ...updates,
      lastUpdated: new Date() 
    };
    
    this.inventoryItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async deleteInventoryItem(id: number): Promise<boolean> {
    return this.inventoryItems.delete(id);
  }
  
  // Dashboard operations
  async getLowStockItems(): Promise<InventoryItemWithDetails[]> {
    return Array.from(this.inventoryItems.values())
      .filter(item => 
        item.lowStockThreshold !== null && 
        item.quantity < (item.lowStockThreshold || 0)
      )
      .map(item => this.enrichInventoryItem(item));
  }
  
  async getRecentlyUpdatedItems(limit: number): Promise<InventoryItemWithDetails[]> {
    return Array.from(this.inventoryItems.values())
      .sort((a, b) => 
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      )
      .slice(0, limit)
      .map(item => this.enrichInventoryItem(item));
  }
  
  async getInventorySummary(): Promise<{ totalItems: number; lowStockCount: number; totalValue: number; openOrders: number; }> {
    const items = Array.from(this.inventoryItems.values());
    const totalItems = items.length;
    
    const lowStockCount = items.filter(item => 
      item.lowStockThreshold !== null && 
      item.quantity < (item.lowStockThreshold || 0)
    ).length;
    
    const totalValue = items.reduce((sum, item) => 
      sum + (item.price || 0) * item.quantity, 0);
    
    // Mock data for open orders since we don't have an orders table
    const openOrders = 7;
    
    return {
      totalItems,
      lowStockCount,
      totalValue,
      openOrders
    };
  }
  
  // Helper methods
  private enrichInventoryItem(item: InventoryItem): InventoryItemWithDetails {
    const category = item.categoryId ? this.categories.get(item.categoryId) : undefined;
    const location = item.locationId ? this.locations.get(item.locationId) : undefined;
    
    return {
      ...item,
      categoryName: category?.name,
      locationName: location?.name
    };
  }
}

// Create and export a storage instance
export const storage = new MemStorage();

import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { 
  insertInventoryItemSchema, 
  updateInventoryItemSchema,
  insertUserSchema,
  insertCategorySchema,
  insertLocationSchema
} from "@shared/schema";

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "inventtrack-secret-key";

// Auth middleware
const authenticateToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  try {
    const user = jwt.verify(token, JWT_SECRET);
    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Admin role middleware
const requireAdmin = (req: Request, res: Response, next: Function) => {
  const user = (req as any).user;
  
  if (user && user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: "Admin privileges required" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Create token
      const token = jwt.sign(
        { id: user.id, username: user.username, name: user.name, role: user.role }, 
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({ 
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Server error during login" });
    }
  });
  
  // User routes (admin only)
  app.post('/api/users', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const newUser = await storage.createUser(validatedData);
      
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating user" });
    }
  });
  
  // Category routes
  app.get('/api/categories', authenticateToken, async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });
  
  app.post('/api/categories', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const newCategory = await storage.createCategory(validatedData);
      res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating category" });
    }
  });
  
  // Location routes
  app.get('/api/locations', authenticateToken, async (req: Request, res: Response) => {
    try {
      const locations = await storage.getLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching locations" });
    }
  });
  
  app.post('/api/locations', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
    try {
      const validatedData = insertLocationSchema.parse(req.body);
      const newLocation = await storage.createLocation(validatedData);
      res.status(201).json(newLocation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid location data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating location" });
    }
  });
  
  // Inventory routes
  app.get('/api/inventory', authenticateToken, async (req: Request, res: Response) => {
    try {
      const items = await storage.getInventoryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching inventory items" });
    }
  });
  
  app.get('/api/inventory/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const item = await storage.getInventoryItemById(id);
      
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching inventory item" });
    }
  });
  
  app.post('/api/inventory', authenticateToken, async (req: Request, res: Response) => {
    try {
      const validatedData = insertInventoryItemSchema.parse(req.body);
      const newItem = await storage.createInventoryItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid item data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating inventory item" });
    }
  });
  
  app.patch('/api/inventory/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = updateInventoryItemSchema.parse(req.body);
      const updatedItem = await storage.updateInventoryItem(id, validatedData);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid item data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error updating inventory item" });
    }
  });
  
  app.delete('/api/inventory/:id', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteInventoryItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error deleting inventory item" });
    }
  });
  
  // Dashboard routes
  app.get('/api/dashboard/summary', authenticateToken, async (req: Request, res: Response) => {
    try {
      const summary = await storage.getInventorySummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard summary" });
    }
  });
  
  app.get('/api/dashboard/recent-items', authenticateToken, async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const recentItems = await storage.getRecentlyUpdatedItems(limit);
      res.json(recentItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent items" });
    }
  });
  
  app.get('/api/dashboard/low-stock', authenticateToken, async (req: Request, res: Response) => {
    try {
      const lowStockItems = await storage.getLowStockItems();
      res.json(lowStockItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching low stock items" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

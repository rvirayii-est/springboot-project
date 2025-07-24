import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ItemCard } from "@/components/inventory/ItemCard";
import { LowStockAlert } from "@/components/inventory/LowStockAlert";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { InventoryItemWithDetails } from "@shared/schema";
import { Archive, AlertTriangle, DollarSign, ShoppingCart } from "lucide-react";

export default function Dashboard() {
  const [, navigate] = useLocation();
  
  // Fetch dashboard summary
  const { data: summary, isLoading: summaryLoading } = useQuery<{
    totalItems: number;
    lowStockCount: number;
    totalValue: number;
    openOrders: number;
  }>({
    queryKey: ["/api/dashboard/summary"],
  });

  // Fetch recently updated items
  const { data: recentItems = [], isLoading: recentLoading } = useQuery<InventoryItemWithDetails[]>({
    queryKey: ["/api/dashboard/recent-items"],
  });

  // Fetch low stock items
  const { data: lowStockItems = [], isLoading: lowStockLoading } = useQuery<InventoryItemWithDetails[]>({
    queryKey: ["/api/dashboard/low-stock"],
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-neutral-800 mb-4">Dashboard</h2>
      
      {/* Dashboard summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total items card */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-neutral-500 mb-1">Total Items</p>
            <div className="flex justify-between items-center">
              {summaryLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-medium">{formatNumber(summary?.totalItems)}</p>
              )}
              <Archive className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        {/* Low stock card */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-neutral-500 mb-1">Low Stock</p>
            <div className="flex justify-between items-center">
              {summaryLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-medium text-error">{formatNumber(summary?.lowStockCount)}</p>
              )}
              <AlertTriangle className="h-5 w-5 text-error" />
            </div>
          </CardContent>
        </Card>
        
        {/* Value card */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-neutral-500 mb-1">Total Value</p>
            <div className="flex justify-between items-center">
              {summaryLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-medium">{formatCurrency(summary?.totalValue)}</p>
              )}
              <DollarSign className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>
        
        {/* Orders card */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-neutral-500 mb-1">Open Orders</p>
            <div className="flex justify-between items-center">
              {summaryLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-medium">{formatNumber(summary?.openOrders)}</p>
              )}
              <ShoppingCart className="h-5 w-5 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recently updated items */}
      <Card className="bg-white mb-6">
        <div className="flex justify-between items-center p-4 border-b border-neutral-100">
          <h3 className="font-medium">Recently Updated Items</h3>
          <Link href="/inventory" className="text-primary text-sm">
            View All
          </Link>
        </div>
        
        {/* Items list */}
        <div className="divide-y divide-neutral-100">
          {recentLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-12 w-full" />
              </div>
            ))
          ) : recentItems.length === 0 ? (
            <div className="p-6 text-center text-neutral-500">
              No inventory items found.
            </div>
          ) : (
            recentItems.map((item: InventoryItemWithDetails) => (
              <div key={item.id}>
                <ItemCard item={item} onClick={() => navigate(`/inventory/${item.id}`)} />
                <Separator />
              </div>
            ))
          )}
        </div>
      </Card>
      
      {/* Low stock alerts */}
      <Card className="bg-white">
        <div className="flex justify-between items-center p-4 border-b border-neutral-100">
          <h3 className="font-medium">Low Stock Alerts</h3>
          <Link href="/inventory" className="text-error text-sm">
            View All
          </Link>
        </div>
        
        {/* Alerts list */}
        <div className="divide-y divide-neutral-100">
          {lowStockLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-12 w-full" />
              </div>
            ))
          ) : lowStockItems.length === 0 ? (
            <div className="p-6 text-center text-neutral-500">
              No low stock alerts at this time.
            </div>
          ) : (
            lowStockItems.map((item: InventoryItemWithDetails) => (
              <div key={item.id}>
                <LowStockAlert item={item} />
                <Separator />
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

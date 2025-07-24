import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ItemCard } from "@/components/inventory/ItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { InventoryItemWithDetails } from "@shared/schema";

export default function InventoryPage() {
  const [_, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  
  // Fetch inventory items
  const { data: inventoryItems = [], isLoading } = useQuery({
    queryKey: ["/api/inventory"],
  });
  
  // Fetch categories for filter
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });
  
  // Filter and sort items
  const filteredItems = inventoryItems.filter((item: InventoryItemWithDetails) => {
    // Apply search filter
    const matchesSearch = 
      searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = 
      categoryFilter === "all" || 
      item.categoryId === parseInt(categoryFilter);
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort items
  const sortedItems = [...filteredItems].sort((a: InventoryItemWithDetails, b: InventoryItemWithDetails) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "quantity-asc":
        return a.quantity - b.quantity;
      case "quantity-desc":
        return b.quantity - a.quantity;
      case "sku-asc":
        return a.sku.localeCompare(b.sku);
      case "updated":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });
  
  const handleItemClick = (id: number) => {
    navigate(`/inventory/${id}`);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-neutral-800 mb-4">Inventory</h2>
      
      {/* Search and filters */}
      <div className="mb-4 flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or SKU..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
              <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
              {categories.map((category: any) => (
                <DropdownMenuRadioItem key={category.id} value={String(category.id)}>
                  {category.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="name-asc">Name (A-Z)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name-desc">Name (Z-A)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="quantity-asc">Quantity (Low to High)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="quantity-desc">Quantity (High to Low)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="sku-asc">SKU</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="updated">Recently Updated</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Items list */}
      <Card className="bg-white">
        <div className="divide-y divide-neutral-100">
          {isLoading ? (
            // Loading skeletons
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-16 w-full" />
              </div>
            ))
          ) : sortedItems.length === 0 ? (
            // No results state
            <div className="p-8 text-center text-neutral-500">
              {searchQuery || categoryFilter !== "all" ? (
                <>
                  <p className="text-lg font-medium">No results found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium">No inventory items</p>
                  <p className="text-sm mt-1">Add your first inventory item to get started</p>
                </>
              )}
              
              <Button className="mt-4" onClick={() => navigate("/inventory/add")}>
                Add Item
              </Button>
            </div>
          ) : (
            // Item list
            sortedItems.map((item: InventoryItemWithDetails) => (
              <div key={item.id}>
                <ItemCard 
                  item={item} 
                  onClick={() => handleItemClick(item.id)} 
                />
                <Separator />
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

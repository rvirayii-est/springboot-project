import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { InventoryForm } from "@/components/inventory/InventoryForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SheetDialog } from "@/components/ui/sheet-dialog";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { formatCurrency, formatNumber, getStockStatusColor, cn, getTimeAgo } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { AlertTriangle, Edit, Trash, Activity } from "lucide-react";

export default function InventoryItemDetails() {
  const { id } = useParams();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Fetch item details
  const { data: item, isLoading } = useQuery({
    queryKey: [`/api/inventory/${id}`],
  });
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/inventory/${id}`, null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/summary"] });
      
      toast({
        title: "Item Deleted",
        description: "Inventory item has been deleted successfully.",
      });
      
      navigate("/inventory");
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
      toast({
        title: "Error",
        description: "There was a problem deleting the inventory item.",
        variant: "destructive",
      });
    },
  });
  
  const handleDelete = () => {
    deleteMutation.mutate();
  };
  
  // Stock status color
  const getStatusInfo = () => {
    if (!item) return { color: "", label: "" };
    
    if (item.quantity <= 0) {
      return { color: "text-destructive", label: "Out of Stock" };
    }
    
    if (item.lowStockThreshold && item.quantity < item.lowStockThreshold) {
      return { color: "text-warning", label: "Low Stock" };
    }
    
    return { color: "text-success", label: "In Stock" };
  };
  
  const statusInfo = getStatusInfo();
  
  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-10 w-48 mb-4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-medium text-neutral-800 mb-4">Item Not Found</h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
              <p className="text-lg font-medium">The requested inventory item could not be found.</p>
              <Button className="mt-4" onClick={() => navigate("/inventory")}>
                Back to Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-neutral-800">Item Details</h2>
        
        {!editMode && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            {isAdmin && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setConfirmDelete(true)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
      
      {editMode ? (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <InventoryForm initialData={item} id={parseInt(id)} isEditing={true} />
          <Button 
            variant="outline" 
            className="mt-4 w-full" 
            onClick={() => setEditMode(false)}
          >
            Cancel Editing
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="details" className="mb-4">
          <TabsList className="mb-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{item.name}</span>
                  <span className={cn("text-sm font-medium px-2 py-1 rounded-full", getStockStatusColor(item.quantity, item.lowStockThreshold))}>
                    {statusInfo.label}
                  </span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">SKU</p>
                    <p className="font-medium">{item.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Barcode</p>
                    <p className="font-medium">{item.barcode || "—"}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{item.description || "No description available"}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{item.categoryName || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{item.locationName || "—"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className={cn("font-medium", statusInfo.color)}>{formatNumber(item.quantity)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">{formatCurrency(item.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Low Stock Threshold</p>
                    <p className="font-medium">{item.lowStockThreshold || "—"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{getTimeAgo(item.lastUpdated)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-4">
                <Button onClick={() => navigate("/inventory")} className="w-full" variant="outline">
                  Back to Inventory
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity History</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-center py-8 text-muted-foreground flex-col">
                  <Activity className="h-12 w-12 mb-4 opacity-50" />
                  <p>Activity tracking coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {/* Delete confirmation */}
      <SheetDialog 
        open={confirmDelete} 
        onOpenChange={setConfirmDelete}
        title="Confirm Deletion"
      >
        <div className="space-y-4 py-4">
          <p>Are you sure you want to delete this inventory item?</p>
          <p className="font-medium">{item.name} ({item.sku})</p>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
        </div>
        
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant="destructive" className="flex-1" onClick={handleDelete}>
            Delete Item
          </Button>
        </div>
      </SheetDialog>
    </div>
  );
}

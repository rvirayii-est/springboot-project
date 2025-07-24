import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { insertInventoryItemSchema, type InsertInventoryItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

const formSchema = insertInventoryItemSchema.extend({
  price: z.string().optional().transform(val => val ? parseFloat(val) : null),
  quantity: z.string().transform(val => parseInt(val) || 0),
  lowStockThreshold: z.string().optional().transform(val => val ? parseInt(val) : null),
});

type FormValues = z.infer<typeof formSchema>;

interface InventoryFormProps {
  initialData?: Partial<InsertInventoryItem>;
  id?: number;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export function InventoryForm({ initialData, id, isEditing = false, onSuccess }: InventoryFormProps) {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isScanning, setIsScanning] = useState(false);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Fetch locations
  const { data: locations = [] } = useQuery({
    queryKey: ["/api/locations"],
  });

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      sku: initialData?.sku || "",
      description: initialData?.description || "",
      categoryId: initialData?.categoryId ? String(initialData.categoryId) : undefined,
      locationId: initialData?.locationId ? String(initialData.locationId) : undefined,
      quantity: initialData?.quantity ? String(initialData.quantity) : "0",
      price: initialData?.price ? String(initialData.price) : undefined,
      lowStockThreshold: initialData?.lowStockThreshold ? String(initialData.lowStockThreshold) : undefined,
      barcode: initialData?.barcode || "",
    },
  });

  // Create/update mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      // Convert string IDs to numbers
      const formattedValues = {
        ...values,
        categoryId: values.categoryId ? parseInt(values.categoryId) : null,
        locationId: values.locationId ? parseInt(values.locationId) : null,
      };

      if (isEditing && id) {
        await apiRequest("PATCH", `/api/inventory/${id}`, formattedValues);
      } else {
        await apiRequest("POST", "/api/inventory", formattedValues);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/summary"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/recent-items"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/low-stock"] });
      
      toast({
        title: isEditing ? "Item Updated" : "Item Added",
        description: isEditing 
          ? "Inventory item has been updated successfully." 
          : "New inventory item has been added successfully.",
        variant: "default",
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/inventory");
      }
    },
    onError: (error) => {
      console.error("Error saving item:", error);
      toast({
        title: "Error",
        description: "There was a problem saving the inventory item.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  function simulateBarcodeScanner() {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      // Generate a random barcode
      const randomBarcode = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
      form.setValue("barcode", randomBarcode);
      setIsScanning(false);
      
      toast({
        title: "Barcode Scanned",
        description: `Barcode ${randomBarcode} has been scanned.`,
      });
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Button
          type="button"
          variant="outline"
          className="w-full bg-primary bg-opacity-10 text-primary py-3 px-4 rounded-lg flex items-center justify-center mb-4"
          onClick={simulateBarcodeScanner}
          disabled={isScanning}
        >
          {isScanning ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span className="material-icons mr-2">qr_code_scanner</span>
          )}
          {isScanning ? "Scanning..." : "Scan Barcode"}
        </Button>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input placeholder="Stock keeping unit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage Location</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations.map((location: any) => (
                      <SelectItem key={location.id} value={String(location.id)}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lowStockThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Low Stock Alert</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="Minimum quantity before alert" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barcode</FormLabel>
              <FormControl>
                <Input placeholder="Scan or enter barcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1" 
            onClick={() => navigate("/inventory")}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-primary text-white" 
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Item" : "Save Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";

export default function SuppliersPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-neutral-800 mb-4">Suppliers</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Supplier Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Truck className="h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-lg font-medium mb-2">Supplier Management Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Manage your suppliers, track contact information, and associate products with specific vendors.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

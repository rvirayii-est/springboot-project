import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-neutral-800 mb-4">Orders</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-lg font-medium mb-2">Order Management Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Track purchase orders, manage suppliers, and automate reordering of low stock items.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

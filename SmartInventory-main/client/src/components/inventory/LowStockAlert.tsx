import { type InventoryItemWithDetails } from "@shared/schema";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

interface LowStockAlertProps {
  item: InventoryItemWithDetails;
}

export function LowStockAlert({ item }: LowStockAlertProps) {
  return (
    <Card className="p-4 flex items-center">
      <div className="w-10 h-10 rounded bg-error bg-opacity-10 flex items-center justify-center mr-3">
        <AlertTriangle className="h-5 w-5 text-error" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-neutral-500">
          <span>{item.sku}</span> • 
          <span className="text-error font-medium"> {item.quantity}</span> units
        </p>
      </div>
      <Link href={`/inventory/${item.id}`}>
        <Button variant="link" className="text-primary text-sm font-medium px-0">
          Order
        </Button>
      </Link>
    </Card>
  );
}

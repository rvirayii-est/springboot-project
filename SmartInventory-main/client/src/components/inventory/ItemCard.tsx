import { type InventoryItemWithDetails } from "@shared/schema";
import { formatCurrency, isLowStock, cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Archive } from "lucide-react";

interface ItemCardProps {
  item: InventoryItemWithDetails;
  onClick?: () => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const isLow = isLowStock(item.quantity, item.lowStockThreshold);
  
  return (
    <Card 
      className={cn(
        "p-4 flex items-center cursor-pointer hover:shadow transition-shadow",
        isLow ? "border-l-4 border-l-warning" : ""
      )}
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center mr-3">
        <Archive className="h-5 w-5 text-neutral-400" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-neutral-500">
          <span>{item.sku}</span> • 
          <span className={cn(isLow ? "text-warning font-medium" : "")}> {item.quantity}</span> units
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatCurrency(item.price)}</p>
        <p className="text-sm text-neutral-500">{item.categoryName}</p>
      </div>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartSidebarProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartSidebar = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartSidebarProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="h-full flex flex-col bg-pos-sidebar border-l-2 border-primary/20">
      <div className="p-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <h2 className="font-semibold">Cart</h2>
          {itemCount > 0 && (
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
              {itemCount}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground mt-8">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <Card key={item.id} className="p-3 bg-card/50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm leading-tight flex-1 mr-2">
                    {item.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="h-7 w-7 p-0"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="min-w-[2rem] text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-7 w-7 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <span className="font-semibold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t bg-card/30">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-pos-total">${total.toFixed(2)}</span>
            </div>
            
            <Button 
              onClick={onCheckout}
              className="w-full h-12 text-base font-semibold bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
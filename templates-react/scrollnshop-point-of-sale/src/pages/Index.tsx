import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { useToast } from "@/hooks/use-toast";
import { Store, Grid, List } from "lucide-react";

// Import product images
import coffeeImg from "@/assets/coffee.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import pastryImg from "@/assets/pastry.jpg";
import drinkImg from "@/assets/drink.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: "1", name: "Espresso Macchiato", price: 4.50, image: coffeeImg, category: "beverages" },
  { id: "2", name: "Club Sandwich", price: 8.75, image: sandwichImg, category: "food" },
  { id: "3", name: "Butter Croissant", price: 3.25, image: pastryImg, category: "pastries" },
  { id: "4", name: "Cola Classic", price: 2.50, image: drinkImg, category: "beverages" },
  { id: "5", name: "Cappuccino", price: 4.25, image: coffeeImg, category: "beverages" },
  { id: "6", name: "Turkey Wrap", price: 7.50, image: sandwichImg, category: "food" },
  { id: "7", name: "Chocolate Muffin", price: 3.75, image: pastryImg, category: "pastries" },
  { id: "8", name: "Fresh Orange Juice", price: 3.50, image: drinkImg, category: "beverages" },
  { id: "9", name: "Latte", price: 4.75, image: coffeeImg, category: "beverages" },
  { id: "10", name: "Caesar Salad", price: 9.25, image: sandwichImg, category: "food" },
  { id: "11", name: "Blueberry Scone", price: 3.50, image: pastryImg, category: "pastries" },
  { id: "12", name: "Iced Tea", price: 2.75, image: drinkImg, category: "beverages" },
];

const CATEGORIES = ["all", "beverages", "food", "pastries"];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  const filteredProducts = selectedCategory === "all" 
    ? SAMPLE_PRODUCTS 
    : SAMPLE_PRODUCTS.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
      variant: "destructive",
    });
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    toast({
      title: "Checkout Complete!",
      description: `Payment of $${total.toFixed(2)} processed successfully.`,
    });
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-pos-header to-primary-glow text-primary-foreground shadow-[var(--shadow-pos)] sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8" />
              <h1 className="text-2xl font-bold">POS System</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="text-primary-foreground hover:bg-white/20"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="text-primary-foreground hover:bg-white/20"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-88px)]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Category Filter */}
          <div className="p-4 bg-card border-b">
            <div className="flex gap-2 overflow-x-auto">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer capitalize whitespace-nowrap transition-all duration-200 hover:scale-105"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className={`gap-4 ${
              viewMode === "grid" 
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4" 
                : "flex flex-col space-y-2"
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l">
          <CartSidebar
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-pos)] hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/30">
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-secondary to-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground capitalize">
            {product.category}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="h-8 w-8 p-0 bg-primary hover:bg-primary-glow transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
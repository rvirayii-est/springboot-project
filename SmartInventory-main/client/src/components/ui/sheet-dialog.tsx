import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  trigger?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function SheetDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
  side = "bottom",
  className,
}: SheetDialogProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
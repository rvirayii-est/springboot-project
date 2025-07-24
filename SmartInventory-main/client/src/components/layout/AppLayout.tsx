import { useState, useEffect, ReactNode } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import BottomNav from "./BottomNav";
import { useLocation } from "wouter";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { InventoryForm } from "@/components/inventory/InventoryForm";
import { SheetDialog } from "@/components/ui/sheet-dialog";

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();

  // Close drawer when location changes on mobile
  useEffect(() => {
    if (isMobile && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [location, isMobile]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const showFab = location === "/inventory" || location === "/dashboard";

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-64 flex-shrink-0">
          <SideNav isOpen={true} onClose={() => {}} />
        </div>
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <SideNav isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      )}
      
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={toggleDrawer} />
        
        <main className="flex-1 pt-14 pb-16 md:pb-0">
          {children}
        </main>
        
        {isMobile && <BottomNav />}
      </div>
      
      {showFab && (
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="fab fixed z-30 w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/90 transition-colors"
          style={{ bottom: "24px", right: "24px" }}
        >
          <Plus className="h-6 w-6" />
        </button>
      )}
      
      {/* Backdrop for drawer on mobile */}
      {isMobile && isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      
      {/* Add Inventory Form Modal */}
      <SheetDialog 
        open={isAddFormOpen} 
        onOpenChange={setIsAddFormOpen}
        title="Add Inventory Item"
        side="bottom"
        className="max-h-[90vh] overflow-y-auto"
      >
        <InventoryForm onSuccess={() => setIsAddFormOpen(false)} />
      </SheetDialog>
    </div>
  );
}

export default AppLayout;

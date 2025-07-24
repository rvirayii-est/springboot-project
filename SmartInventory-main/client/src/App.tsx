import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/auth-context";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import InventoryPage from "@/pages/inventory";
import InventoryItemDetails from "@/pages/inventory/[id]";
import AddInventoryItem from "@/pages/inventory/add";
import OrdersPage from "@/pages/orders";
import SuppliersPage from "@/pages/suppliers";
import ReportsPage from "@/pages/reports";
import SettingsPage from "@/pages/settings";
import { useAuth } from "./hooks/use-auth";

function ProtectedRoutes() {
  const [location, setLocation] = useLocation();
  const { user, isLoading } = useAuth();

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    setLocation("/login");
    return null;
  }

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/inventory" component={InventoryPage} />
        <Route path="/inventory/add" component={AddInventoryItem} />
        <Route path="/inventory/:id" component={InventoryItemDetails} />
        <Route path="/orders" component={OrdersPage} />
        <Route path="/suppliers" component={SuppliersPage} />
        <Route path="/reports" component={ReportsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route>
              <ProtectedRoutes />
            </Route>
          </Switch>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

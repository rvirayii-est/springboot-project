import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layouts/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/users" element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          } />
          <Route path="/analytics" element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          } />
          <Route path="/reports" element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          } />
          <Route path="/notifications" element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Link2, 
  Calendar, 
  CheckSquare, 
  Calendar as CalendarIcon,
  Users2,
  Coffee,
  Grid3x3,
  Briefcase,
  Crown,
  DollarSign,
  Shield,
  Eye,
  Building2,
  X
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Members", href: "/members", icon: Users },
  { name: "Connections", href: "/connections", icon: Link2 },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Small Groups", href: "/small-groups", icon: Users2 },
  { name: "MeetUps", href: "/meetups", icon: Coffee },
  { name: "Groups", href: "/groups", icon: Grid3x3 },
  { name: "Ministries", href: "/ministries", icon: Briefcase },
  { name: "Positions", href: "/positions", icon: Crown },
  { name: "Accounting", href: "/accounting", icon: DollarSign },
  { name: "Permissions", href: "/permissions", icon: Shield },
  { name: "Permission Overview", href: "/permission-overview", icon: Eye },
  { name: "Churches", href: "/churches", icon: Building2 },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full w-72 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-gradient-to-r from-ministry-blue to-ministry-blue-light rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-ministry-blue to-ministry-blue-light bg-clip-text text-transparent">
              Mindnistry
            </h1>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-gradient-to-r from-ministry-blue to-ministry-blue-light text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { NAV_ITEMS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type SideNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SideNav({ isOpen, onClose }: SideNavProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className={`drawer-container ${isOpen ? 'open' : 'closed'} fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform md:translate-x-0 md:z-20 md:sticky`}>
      {/* User info section */}
      <div className="bg-primary h-40 p-4 flex flex-col justify-end">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 bg-white text-primary">
            <AvatarFallback className="bg-white text-primary">
              {user ? getInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-white font-medium">{user?.name || "User"}</p>
            <p className="text-white text-sm opacity-80 capitalize">{user?.role || "Guest"}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation links */}
      <div className="py-2">
        {NAV_ITEMS.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            onClick={() => onClose()}
            className={cn(
              "flex items-center px-4 py-3 text-neutral-800 hover:bg-neutral-100 block",
              location === item.path && "active-nav-item"
            )}
          >
            <span className="material-icons text-neutral-500 mr-6">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        
        <div className="border-t border-neutral-200 my-2"></div>
        
        <button 
          className="flex items-center px-4 py-3 text-neutral-800 hover:bg-neutral-100 w-full text-left"
          onClick={() => {
            logout();
            onClose();
          }}
        >
          <span className="material-icons text-neutral-500 mr-6">logout</span>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default SideNav;

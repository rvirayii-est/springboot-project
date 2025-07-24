import { useAuth } from "@/hooks/use-auth";
import { Menu, BellRing, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";

type HeaderProps = {
  onMenuClick: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-primary z-40 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-primary-dark focus-visible:bg-primary-dark" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-white text-lg font-medium ml-2">InventTrack</h1>
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-primary-dark focus-visible:bg-primary-dark">
          <BellRing className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-primary-dark focus-visible:bg-primary-dark ml-1">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary-dark text-white text-sm">
                  {user ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="p-2">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.role}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => window.location.href = "/settings"}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={logout}>
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;

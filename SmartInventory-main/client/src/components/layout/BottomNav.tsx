import { useLocation, Link } from "wouter";
import { MOBILE_BOTTOM_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

function BottomNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white shadow-inner z-20 flex justify-around items-center md:hidden">
      {MOBILE_BOTTOM_NAV.map((item, index) => {
        // Center position is reserved for the FAB
        if (index === Math.floor(MOBILE_BOTTOM_NAV.length / 2)) {
          return (
            <div key="spacer" className="w-1/5 flex justify-center">
              {/* Spacer for FAB */}
            </div>
          );
        }
        
        const isActive = location === item.path;
        
        return (
          <Link key={item.path} href={item.path}>
            <a className={cn(
              "flex flex-col items-center justify-center h-full w-1/5",
              isActive ? "text-primary" : "text-neutral-500"
            )}>
              <span className="material-icons text-current">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          </Link>
        );
      })}
    </div>
  );
}

export default BottomNav;

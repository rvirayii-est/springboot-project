import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Users, Calendar, CheckSquare, DollarSign, Users2, Coffee } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden lg:block h-screen w-64 fixed left-0 top-0 z-30">
        <Sidebar isOpen={true} setIsOpen={setSidebarOpen} />
      </div>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

     {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 h-screen">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Ministry Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome to your church management center</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Total Members"
              value={245}
              description="Active church members"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="This Month's Events"
              value={8}
              description="Scheduled activities"
              icon={Calendar}
              trend={{ value: 25, isPositive: true }}
            />
            <StatsCard
              title="Pending Tasks"
              value={14}
              description="Ministry assignments"
              icon={CheckSquare}
            />
            <StatsCard
              title="Monthly Giving"
              value="$12,450"
              description="Donations received"
              icon={DollarSign}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Small Groups"
              value={12}
              description="Active groups"
              icon={Users2}
              trend={{ value: 2, isPositive: true }}
            />
            <StatsCard
              title="Upcoming MeetUps"
              value={6}
              description="Planned gatherings"
              icon={Coffee}
            />
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <QuickActions />
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <UpcomingEvents />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
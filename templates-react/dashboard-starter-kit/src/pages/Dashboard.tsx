import { UserDataTable } from "@/components/UserDataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "10",
    description: "Active user accounts",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Active Users",
    value: "7",
    description: "Currently active",
    icon: UserCheck,
    color: "text-success",
  },
  {
    title: "Inactive Users",
    value: "1",
    description: "Inactive accounts",
    icon: UserX,
    color: "text-destructive",
  },
  {
    title: "Pending Users",
    value: "2",
    description: "Awaiting approval",
    icon: Clock,
    color: "text-warning",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Monitor and manage your users.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Table */}
      <UserDataTable />
    </div>
  );
};

export default Dashboard;
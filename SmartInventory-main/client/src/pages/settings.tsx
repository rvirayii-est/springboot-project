import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-neutral-800 mb-4">Settings</h2>
      
      <Tabs defaultValue="account" className="mb-4">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Information
              </CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <div className="p-2 border rounded-md bg-muted/50">
                    {user?.name || "User"}
                  </div>
                </div>
                <div>
                  <Label>Username</Label>
                  <div className="p-2 border rounded-md bg-muted/50">
                    {user?.username || "username"}
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Role</Label>
                <div className="p-2 border rounded-md bg-muted/50 capitalize">
                  {user?.role || "User"}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                Account management features coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Control which notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive alerts when items are running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-muted-foreground">Be notified when orders change status</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Updates</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about system changes</p>
                </div>
                <Switch />
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                Notification functionality coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Admin Settings
                </CardTitle>
                <CardDescription>System configuration and user management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Admin Settings Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Configure system settings, manage users, and control access permissions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

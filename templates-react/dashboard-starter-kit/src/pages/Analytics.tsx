import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          View detailed analytics and insights.
        </p>
      </div>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            Comprehensive analytics will be displayed here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Analytics features coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
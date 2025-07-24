import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-neutral-800 mb-4">Reports</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Charts and reports coming soon</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Stock Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Charts and reports coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Inventory Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-lg font-medium mb-2">Advanced Reporting Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Gain insights into your inventory with detailed reports and analytics. Track trends, monitor product performance, and make data-driven decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

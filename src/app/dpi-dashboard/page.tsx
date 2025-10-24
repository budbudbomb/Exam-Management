
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DpiDashboardPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>DPI Dashboard</CardTitle>
          <CardDescription>
            Welcome to the DPI Dashboard. Select a module from the sidebar to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content area for the DPI dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}

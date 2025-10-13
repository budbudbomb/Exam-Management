import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import SchoolReports from './_components/school-reports';

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Report Cards</h1>
        <p className="text-muted-foreground">
          Generate, view, and export student report cards and other result formats.
        </p>
      </div>
      <Tabs defaultValue="school" className="space-y-4">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm -mx-6 px-6 py-2 border-b">
          <TabsList>
            <TabsTrigger value="school">School</TabsTrigger>
            <TabsTrigger value="vimarsh">Vimarsh</TabsTrigger>
            <TabsTrigger value="deo">DEO</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="school" className="space-y-4 mt-0">
          <SchoolReports />
        </TabsContent>
        <TabsContent value="vimarsh" className="space-y-4 mt-0">
          <p>Vimarsh reports will be available here.</p>
        </TabsContent>
        <TabsContent value="deo" className="space-y-4 mt-0">
          <p>DEO reports will be available here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

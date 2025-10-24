import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MarksEntryForm from './_components/marks-entry-form';

export default function MarksEntryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Marks Entry</h1>
      <p className="text-muted-foreground">
        Select the criteria to load the student list and enter their marks.
      </p>
      
      <Card>
        <CardContent className="pt-6">
          <MarksEntryForm userRole="school" />
        </CardContent>
      </Card>
    </div>
  );
}

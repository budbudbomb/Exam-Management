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
        <CardHeader>
          <CardTitle>Enter Student Marks</CardTitle>
          <CardDescription>
            Use the filters below to find the correct list of students and begin entering their theory and practical marks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarksEntryForm userRole="school" />
        </CardContent>
      </Card>
    </div>
  );
}

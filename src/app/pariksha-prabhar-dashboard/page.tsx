import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MarksEntryForm from '@/app/dashboard/marks-entry/_components/marks-entry-form';

export default function ParikshaPrabharDashboardPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Marks Verification</CardTitle>
          <CardDescription>
            Verify and approve student marks submitted by teachers. Use the filters below to find the correct list of students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarksEntryForm />
        </CardContent>
      </Card>
    </div>
  );
}

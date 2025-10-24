import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StudentVerificationForm from './_components/student-verification-form';

export default function VerifyEnrolledStudentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Verify Enrolled Students</h1>
      <p className="text-muted-foreground">
        Verify the master student list fetched from the education portal.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Verify Student Details</CardTitle>
          <CardDescription>
            Select the academic year and class to load the student list. Review the details and use the checkbox to verify each student.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <StudentVerificationForm />
        </CardContent>
      </Card>
    </div>
  );
}


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ExamScheduleForm from './_components/exam-schedule-form';
import ExistingSchedules from './_components/existing-schedules';

export default function ExamSchedulePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Exam Schedule</h1>
        <p className="text-muted-foreground">
          Create, view, and manage exam schedules for different classes.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Set Exam Schedule</CardTitle>
            <CardDescription>Select an exam type and class to create or modify a schedule.</CardDescription>
        </CardHeader>
        <CardContent>
            <ExamScheduleForm />
        </CardContent>
      </Card>

      <ExistingSchedules />
    </div>
  );
}

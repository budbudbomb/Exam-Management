
import StudentsTable from '@/app/dashboard/masters/_components/students-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function StudentDetailsUpdatePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Update Students Details</h1>
        <p className="text-muted-foreground">
          Find and update student profile information.
        </p>
      </div>
      <StudentsTable />
    </div>
  );
}

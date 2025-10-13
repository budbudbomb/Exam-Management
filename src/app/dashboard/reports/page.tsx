import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockClasses, mockStudents } from '@/lib/data';
import { Button } from '@/components/ui/button';
import ReportCard from './_components/report-card';
import { Label } from '@/components/ui/label';
import { FileDown, Printer } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Report Cards</h1>
      <p className="text-muted-foreground">
        Generate, view, and export student report cards and other result formats.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>View Report Card</CardTitle>
          <CardDescription>
            Select a class and student to view their generated report card.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                <SelectContent>
                  {mockClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Student</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                <SelectContent>
                  {mockStudents.map(student => (
                    <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button>View Report</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
             <h2 className="text-2xl font-semibold">Generated Report for Aarav Sharma</h2>
             <div className="flex gap-2">
                 <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                 <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Export for DEO</Button>
             </div>
        </div>
        <ReportCard />
      </div>

    </div>
  );
}

import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  ClipboardEdit,
  FileText,
  Users,
  UserCheck,
  User,
  CalendarDays,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const overviewCards = [
    { title: "Total Students", value: "1,250", icon: <Users className="h-4 w-4 text-muted-foreground" />, description: "+20.1% from last month" },
    { title: "Classes", value: "45", icon: <BookOpen className="h-4 w-4 text-muted-foreground" />, description: "+180.1% from last month" },
    { title: "Exams Conducted", value: "12", icon: <ClipboardEdit className="h-4 w-4 text-muted-foreground" />, description: "+19% from last month" },
    { title: "Reports Generated", value: "573", icon: <FileText className="h-4 w-4 text-muted-foreground" />, description: "+201 since last hour" },
];

const recentActivities = [
    { name: "Olivia Martin", activity: "entered marks for Class 10A, Math.", time: "2 minutes ago" },
    { name: "Jackson Lee", activity: "generated report cards for Class 8.", time: "10 minutes ago" },
    { name: "Isabella Nguyen", activity: "updated student profiles for new admissions.", time: "30 minutes ago" },
    { name: "William Kim", activity: "configured the Annual Exam.", time: "1 hour ago" },
    { name: "Sofia Davis", activity: "added a new subject 'Artificial Intelligence'.", time: "2 hours ago" },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map(card => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              An overview of recent actions performed in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{activity.name}</div>
                      </TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump directly to the most common tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/dashboard/verify-enrolled-students" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Verify Enrolled Students
                </Button>
            </Link>
             <Link href="/dashboard/student-details-update" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Update Students Details
                </Button>
            </Link>
             <Link href="/dashboard/view-exam-schedule" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    View Exam Schedule
                </Button>
            </Link>
            <Link href="/dashboard/marks-entry" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <ClipboardEdit className="mr-2 h-4 w-4" />
                    Enter Marks
                </Button>
            </Link>
            <Link href="/dashboard/reports" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report Cards
                </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

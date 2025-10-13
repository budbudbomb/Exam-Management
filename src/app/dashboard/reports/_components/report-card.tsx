import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons/logo';

const subjectMarks = [
    { subject: 'Mathematics', code: 'M-101', theory: 78, practical: 'N/A', total: 78, grade: 'C' },
    { subject: 'Science', code: 'S-101', theory: 65, practical: 22, total: 87, grade: 'B' },
    { subject: 'English', code: 'E-101', theory: 92, practical: 'N/A', total: 92, grade: 'A' },
    { subject: 'Social Science', code: 'SS-101', theory: 88, practical: 'N/A', total: 88, grade: 'B' },
    { subject: 'Computer Science', code: 'CS-101', theory: 45, practical: 48, total: 93, grade: 'A' },
];

export default function ReportCard() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Logo className="h-12 w-12 text-primary" />
                <div>
                    <CardTitle className="text-2xl font-headline">EduReport Pro Academy</CardTitle>
                    <CardDescription>Annual Report Card - 2024</CardDescription>
                </div>
            </div>
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://i.pravatar.cc/80?u=1" alt="Aarav Sharma" />
                <AvatarFallback>AS</AvatarFallback>
            </Avatar>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
            <div><span className="font-medium text-muted-foreground">Student Name:</span> Aarav Sharma</div>
            <div><span className="font-medium text-muted-foreground">Class:</span> 10 A</div>
            <div><span className="font-medium text-muted-foreground">Roll No:</span> 10A-01</div>
            <div><span className="font-medium text-muted-foreground">Date of Birth:</span> 15-04-2008</div>
        </div>
        <Separator />
        <div className="my-6">
            <h3 className="text-lg font-semibold mb-2">Academic Performance</h3>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead className="text-center">Theory</TableHead>
                            <TableHead className="text-center">Practical</TableHead>
                            <TableHead className="text-center">Total Marks</TableHead>
                            <TableHead className="text-center">Grade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjectMarks.map(item => (
                            <TableRow key={item.subject}>
                                <TableCell className="font-medium">{item.subject}</TableCell>
                                <TableCell>{item.code}</TableCell>
                                <TableCell className="text-center">{item.theory}</TableCell>
                                <TableCell className="text-center">{item.practical}</TableCell>
                                <TableCell className="text-center font-bold">{item.total}</TableCell>
                                <TableCell className="text-center font-semibold">{item.grade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle>Final Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Total Marks:</span> <span className="font-bold">438 / 500</span></div>
                    <div className="flex justify-between"><span>Percentage:</span> <span className="font-bold">87.6%</span></div>
                    <div className="flex justify-between"><span>Overall Grade:</span> <span className="font-bold text-lg text-primary">B</span></div>
                    <div className="flex justify-between"><span>Division:</span> <span className="font-bold">First Division</span></div>
                    <div className="flex justify-between"><span>Result:</span> <span className="font-bold text-accent-foreground">PASS</span></div>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                 <CardHeader>
                    <CardTitle>Teacher's Remarks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">Aarav has shown consistent improvement throughout the year. He is a diligent student with a keen interest in Science and Computers. With a bit more focus on Mathematics, he can achieve even greater heights. Keep up the excellent work!</p>
                </CardContent>
            </Card>
        </div>
        <div className="mt-8 flex justify-between text-sm text-muted-foreground">
            <div>Date: 25-03-2024</div>
            <div className="text-center">
                <div className="h-10"></div>
                <div>Principal's Signature</div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

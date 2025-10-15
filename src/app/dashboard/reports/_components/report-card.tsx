import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons/logo';
import { mockExams } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const studentBioData = {
    name: "Aarav Sharma",
    fatherName: "Suresh Sharma",
    motherName: "Sunita Sharma",
    dob: "15-04-2008",
    category: "General",
    medium: "English",
    rollNumber: "10A-01",
    samagraId: "123456789",
    enrollmentNumber: "ENR-2024-12345"
};

const quarterlyMarks = [
    { subject: 'Mathematics', code: 'M-101', theory: 70, practical: 'N/A', total: 70, grade: 'C' },
    { subject: 'Science', code: 'S-101', theory: 60, practical: 20, total: 80, grade: 'B' },
    { subject: 'English', code: 'E-101', theory: 85, practical: 'N/A', total: 85, grade: 'B' },
    { subject: 'Social Science', code: 'SS-101', theory: 80, practical: 'N/A', total: 80, grade: 'B' },
    { subject: 'Computer Science', code: 'CS-101', theory: 40, practical: 45, total: 85, grade: 'B' },
];

const halfYearlyMarks = [
    { subject: 'Mathematics', code: 'M-101', theory: 75, practical: 'N/A', total: 75, grade: 'C' },
    { subject: 'Science', code: 'S-101', theory: 68, practical: 21, total: 89, grade: 'B' },
    { subject: 'English', code: 'E-101', theory: 90, practical: 'N/A', total: 90, grade: 'A' },
    { subject: 'Social Science', code: 'SS-101', theory: 85, practical: 'N/A', total: 85, grade: 'B' },
    { subject: 'Computer Science', code: 'CS-101', theory: 42, practical: 47, total: 89, grade: 'B' },
];

const annualMarks = [
    { subject: 'Mathematics', code: 'M-101', theory: 85, practical: 'N/A', total: 85, grade: 'B' },
    { subject: 'Science', code: 'S-101', theory: 72, practical: 23, total: 95, grade: 'A' },
    { subject: 'English', code: 'E-101', theory: 95, practical: 'N/A', total: 95, grade: 'A' },
    { subject: 'Social Science', code: 'SS-101', theory: 92, practical: 'N/A', total: 92, grade: 'A' },
    { subject: 'Computer Science', code: 'CS-101', theory: 48, practical: 49, total: 97, grade: 'A' },
];


const examMarks = [
    { examType: 'Quarterly', marks: quarterlyMarks, percentage: 80 },
    { examType: 'Half Yearly', marks: halfYearlyMarks, percentage: 85.6 },
    { examType: 'Annual', marks: annualMarks, percentage: 92.8 },
];

const finalResult = {
    totalMarks: 1321,
    maxMarks: 1500,
    finalPercentage: 88.07,
    overallGrade: 'B',
    division: 'First Division',
    result: 'PASS'
};

const ExamMarksTable = ({ examType, marks, percentage }: { examType: string; marks: any[], percentage: number }) => (
    <div className="mb-8">
        <div className="flex justify-between items-baseline mb-2">
            <h4 className="text-lg font-semibold">{examType} Exam</h4>
            <p className="text-sm font-bold">Percentage: {percentage}%</p>
        </div>
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
                    {marks.map(item => (
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
);


export default function ReportCard() {
    const studentAvatar = PlaceHolderImages.find(p => p.id === 'student-avatar');
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
            <Avatar className="h-24 w-24">
                <AvatarImage src={studentAvatar?.imageUrl} alt={studentBioData.name} data-ai-hint={studentAvatar?.imageHint} />
                <AvatarFallback>{studentBioData.name.substring(0,2)}</AvatarFallback>
            </Avatar>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div>
            <h3 className="text-lg font-semibold mb-2">Student Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm mb-6 border p-4 rounded-md">
                <div><span className="font-medium text-muted-foreground">Student Name:</span> {studentBioData.name}</div>
                <div><span className="font-medium text-muted-foreground">Father's Name:</span> {studentBioData.fatherName}</div>
                <div><span className="font-medium text-muted-foreground">Mother's Name:</span> {studentBioData.motherName}</div>
                <div><span className="font-medium text-muted-foreground">Date of Birth:</span> {studentBioData.dob}</div>
                <div><span className="font-medium text-muted-foreground">Category:</span> {studentBioData.category}</div>
                <div><span className="font-medium text-muted-foreground">Medium:</span> {studentBioData.medium}</div>
                <div><span className="font-medium text-muted-foreground">Roll No:</span> {studentBioData.rollNumber}</div>
                <div><span className="font-medium text-muted-foreground">Samagra ID:</span> {studentBioData.samagraId}</div>
                <div><span className="font-medium text-muted-foreground">Enrollment No:</span> {studentBioData.enrollmentNumber}</div>
            </div>
        </div>

        <Separator />

        <div className="my-6">
            <h3 className="text-xl font-bold mb-4 text-center">Academic Performance</h3>
            {examMarks.map(exam => (
                <ExamMarksTable key={exam.examType} {...exam} />
            ))}
        </div>
        
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-muted/50 md:col-span-1">
                <CardHeader>
                    <CardTitle>Final Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Total Marks:</span> <span className="font-bold">{finalResult.totalMarks} / {finalResult.maxMarks}</span></div>
                    <div className="flex justify-between"><span>Final Percentage:</span> <span className="font-bold">{finalResult.finalPercentage}%</span></div>
                    <div className="flex justify-between"><span>Overall Grade:</span> <span className="font-bold text-lg text-primary">{finalResult.overallGrade}</span></div>
                    <div className="flex justify-between"><span>Division:</span> <span className="font-bold">{finalResult.division}</span></div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-lg">Result:</span> 
                        <span className="font-bold text-xl text-accent-foreground bg-accent/20 px-3 py-1 rounded-md">{finalResult.result}</span>
                    </div>
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
        <div className="mt-12 flex justify-between text-sm text-muted-foreground">
            <div>Date: 25-03-2024</div>
            <div className="text-center">
                <div className="h-10"></div>
                <div>Principal's Signature</div>
            </div>
             <div className="text-center">
                <div className="h-10"></div>
                <div>Class Teacher's Signature</div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

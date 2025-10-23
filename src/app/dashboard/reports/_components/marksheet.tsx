
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const studentBioData = {
    rollNo: "10200301",
    enrolmentNo: "A22/150503031/015",
    sssmid: "148421849",
    scholarNo: "8882",
    schoolCode: "503031",
    centerCode: "503001",
    name: "AARAV SHARMA",
    fatherName: "SURESH SHARMA",
    motherName: "SUNITA SHARMA",
    dobFigures: "15/04/2008",
    dobWords: "FIFTEENTH APRIL TWO THOUSAND EIGHT"
};

const marksData = [
  { subjectCode: "411", subjectName: "HINDI", maxTheory: 75, maxPractical: 25, minTheory: 25, minPractical: " ", annualTheory: 65, annualPractical: 20, quarterlyWeightage: 4, halfYearlyWeightage: 4, totalTheory: 73, totalPractical: " ", grandTotal: 93, remark: "DISTN" },
  { subjectCode: "401", subjectName: "ENGLISH", maxTheory: 75, maxPractical: 25, minTheory: 25, minPractical: " ", annualTheory: 68, annualPractical: 22, quarterlyWeightage: 4, halfYearlyWeightage: 4, totalTheory: 76, totalPractical: " ", grandTotal: 98, remark: "DISTN" },
  { subjectCode: "512", subjectName: "SANSKRIT", maxTheory: 75, maxPractical: 25, minTheory: 25, minPractical: " ", annualTheory: 62, annualPractical: 21, quarterlyWeightage: 3, halfYearlyWeightage: 4, totalTheory: 69, totalPractical: " ", grandTotal: 90, remark: "DISTN" },
  { subjectCode: "100", subjectName: "MATHEMATICS", maxTheory: 75, maxPractical: 25, minTheory: 25, minPractical: " ", annualTheory: 55, annualPractical: 18, quarterlyWeightage: 3, halfYearlyWeightage: 3, totalTheory: 61, totalPractical: " ", grandTotal: 79, remark: "" },
  { subjectCode: "200", subjectName: "SCIENCE", maxTheory: 75, maxPractical: 25, minTheory: 25, minPractical: 8, annualTheory: 45, annualPractical: 20, quarterlyWeightage: 4, halfYearlyWeightage: 4, totalTheory: 53, totalPractical: " ", grandTotal: 73, remark: "GRACE" },
  { subjectCode: "300", subjectName: "SOCIAL SCIENCE", maxTheory: 75, maxPractical: 25, minTheory: 25, minPractical: " ", annualTheory: 66, annualPractical: 23, quarterlyWeightage: 4, halfYearlyWeightage: 4, totalTheory: 74, totalPractical: " ", grandTotal: 97, remark: "DISTN" },
];

const finalResult = {
    grandTotal: 530,
    outOf: 600,
    result: "PASS",
    percentage: "88.33 %",
    grade: "FIRST DIVISION",
    environmentalGrade: "A",
};

export default function Marksheet() {
    const studentAvatar = PlaceHolderImages.find(p => p.id === 'student-avatar');

    return (
        <Card className="max-w-5xl mx-auto font-sans text-xs">
            <CardContent className="p-4 border-2 border-black">
                <div className="text-center mb-2">
                    <div className="flex justify-between items-center">
                        <Logo className="h-16 w-16" />
                        <div className="flex-grow">
                            <p className="text-lg font-bold">GOVERNMENT SUBHASH EXCELLENCE HIGHER SECONDARY SCHOOL</p>
                            <p className="font-semibold">BHOPAL (M.P.)</p>
                            <div className="inline-block border-2 border-black px-4 py-1 mt-1">
                                <p className="font-bold text-lg tracking-wider">MARKSHEET</p>
                            </div>
                            <p className="font-semibold mt-1">ANNUAL EXAMINATION-2024</p>
                            <p className="font-semibold">Class : 10th</p>
                        </div>
                        <div className="w-24 h-28 border border-black flex items-center justify-center bg-gray-100">
                             <Avatar className="h-full w-full rounded-none">
                                <AvatarImage src={studentAvatar?.imageUrl} alt={studentBioData.name} data-ai-hint={studentAvatar?.imageHint} className="object-cover" />
                                <AvatarFallback>{studentBioData.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>

                <div className="border-y-2 border-black py-1">
                     <div className="grid grid-cols-4 gap-x-4">
                        <div className="font-semibold">Roll No. : <span className="font-normal">{studentBioData.rollNo}</span></div>
                        <div className="font-semibold">Enrolment No. : <span className="font-normal">{studentBioData.enrolmentNo}</span></div>
                        <div className="font-semibold">SSSMID : <span className="font-normal">{studentBioData.sssmid}</span></div>
                        <div className="font-semibold">Scholar No. : <span className="font-normal">{studentBioData.scholarNo}</span></div>
                        <div className="font-semibold">School Code : <span className="font-normal">{studentBioData.schoolCode}</span></div>
                        <div className="font-semibold">Center Code : <span className="font-normal">{studentBioData.centerCode}</span></div>
                    </div>
                </div>
                
                <div className="border-b-2 border-black py-1">
                    <div className="grid grid-cols-2 gap-x-4">
                       <div className="font-semibold">Name of Student : <span className="font-normal">{studentBioData.name}</span></div>
                       <div className="font-semibold">Father's Name : <span className="font-normal">{studentBioData.fatherName}</span></div>
                       <div className="font-semibold">Mother's Name : <span className="font-normal">{studentBioData.motherName}</span></div>
                    </div>
                     <div className="font-semibold">Date of Birth (In Figure) : <span className="font-normal">{studentBioData.dobFigures}</span> (In Words) : <span className="font-normal">{studentBioData.dobWords}</span></div>
                </div>

                <div className="border-b-2 border-black">
                    <Table className="text-xs">
                        <TableHeader>
                            <TableRow className="border-b-2 border-black">
                                <TableHead rowSpan={2} className="border-r border-black align-middle text-center w-[5%]">S.No.</TableHead>
                                <TableHead rowSpan={2} className="border-r border-black align-middle text-center w-[10%]">SUB CODE</TableHead>
                                <TableHead rowSpan={2} className="border-r-2 border-black align-middle text-center w-[20%]">SUBJECT</TableHead>
                                <TableHead colSpan={2} className="border-r-2 border-black align-middle text-center">MAXIMUM MARKS</TableHead>
                                <TableHead colSpan={2} className="border-r-2 border-black align-middle text-center">MINIMUM MARKS</TableHead>
                                <TableHead colSpan={2} className="border-r-2 border-black align-middle text-center">ANNUAL OBTAINED MARKS</TableHead>
                                <TableHead rowSpan={2} className="border-r-2 border-black align-middle text-center">5% WEIGHTAGE OF QUARTERLY EXAM</TableHead>
                                <TableHead rowSpan={2} className="border-r-2 border-black align-middle text-center">5% WEIGHTAGE OF HALF YEARLY EXAM</TableHead>
                                <TableHead colSpan={2} className="border-r-2 border-black align-middle text-center">TOTAL (IN ROUND)</TableHead>
                                <TableHead rowSpan={2} className="border-r-2 border-black align-middle text-center">GRAND TOTAL</TableHead>
                                <TableHead rowSpan={2} className="align-middle text-center">REMARK</TableHead>
                            </TableRow>
                             <TableRow className="border-b-2 border-black">
                                <TableHead className="border-r border-black text-center">TH</TableHead>
                                <TableHead className="border-r-2 border-black text-center">PR</TableHead>
                                <TableHead className="border-r border-black text-center">TH</TableHead>
                                <TableHead className="border-r-2 border-black text-center">PR</TableHead>
                                <TableHead className="border-r border-black text-center">THEORY</TableHead>
                                <TableHead className="border-r-2 border-black text-center">PRACTICAL</TableHead>
                                <TableHead className="border-r border-black text-center">TH</TableHead>
                                <TableHead className="border-r-2 border-black text-center">PR</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {marksData.map((row, index) => (
                                <TableRow key={index} className="border-b-2 border-black h-8">
                                    <TableCell className="border-r border-black text-center">{index + 1}</TableCell>
                                    <TableCell className="border-r border-black text-center">{row.subjectCode}</TableCell>
                                    <TableCell className="border-r-2 border-black">{row.subjectName}</TableCell>
                                    <TableCell className="border-r border-black text-center">{row.maxTheory}</TableCell>
                                    <TableCell className="border-r-2 border-black text-center">{row.maxPractical}</TableCell>
                                    <TableCell className="border-r border-black text-center">{row.minTheory}</TableCell>
                                    <TableCell className="border-r-2 border-black text-center">{row.minPractical}</TableCell>
                                    <TableCell className="border-r border-black text-center">{row.annualTheory}</TableCell>
                                    <TableCell className="border-r-2 border-black text-center">{row.annualPractical}</TableCell>
                                    <TableCell className="border-r-2 border-black text-center">{row.quarterlyWeightage}</TableCell>
                                    <TableCell className="border-r-2 border-black text-center">{row.halfYearlyWeightage}</TableCell>
                                    <TableCell className="border-r border-black text-center">{row.totalTheory}</TableCell>
                                    <TableCell className="border-r-2 border-black text-center">{row.totalPractical}</TableCell>
                                    <TableCell className="border-r-2 border-black text-center font-bold">{row.grandTotal}</TableCell>
                                    <TableCell className="text-center font-bold">{row.remark}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="border-b-2 border-black h-8 font-bold">
                                <TableCell colSpan={11} className="text-right border-r-2 border-black">GRAND TOTAL</TableCell>
                                <TableCell colSpan={2} className="border-r-2 border-black text-center">530</TableCell>
                                <TableCell className="border-r-2 border-black text-center">530</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div className="border-b-2 border-black p-1">
                    <p className="font-semibold">TOTAL MARKS IN WORDS : <span className="font-normal">FIVE HUNDRED THIRTY</span></p>
                </div>
                 <div className="grid grid-cols-2">
                    <div className="p-1">
                        <p className="font-bold">NOTE: BEST OF FIVE calculation is done in final result.</p>
                        <div className="grid grid-cols-4 mt-20">
                            <p className="font-semibold">Date: 30/04/2024</p>
                            <p className="font-semibold col-span-2 text-center">Class Teacher</p>
                            <p className="font-semibold text-right">Principal</p>
                        </div>
                    </div>
                     <div className="border-l-2 border-black p-1 text-center">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="border border-black p-1"><span className="font-bold">RESULT</span> : {finalResult.result}</div>
                            <div className="border border-black p-1"><span className="font-bold">TOTAL MARKS</span> : {finalResult.grandTotal}/{finalResult.outOf}</div>
                            <div className="border border-black p-1 col-span-2"><span className="font-bold">PERCENTAGE</span> : {finalResult.percentage}</div>
                            <div className="border border-black p-1 col-span-2"><span className="font-bold">GRADE</span> : {finalResult.grade}</div>
                            <div className="border border-black p-1 col-span-2"><span className="font-bold">Environmental Education</span> : {finalResult.environmentalGrade}</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

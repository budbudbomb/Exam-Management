
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockClasses, mockStudents } from '@/lib/data';
import { Button } from '@/components/ui/button';
import ReportCard from './report-card';
import { Label } from '@/components/ui/label';
import { FileDown, Printer } from 'lucide-react';
import { useState } from 'react';
import Marksheet from './marksheet';

const reportFormats = [
    { id: 'annual-result', name: 'Annual Result' },
    { id: 'supplementary-list', name: 'Supplementary List' },
    { id: 'school-register', name: 'School Register' },
    { id: 'marksheet', name: 'Marksheet' },
    { id: 'notice-board', name: 'Notice Board' },
    { id: 'merit-list', name: 'Merit List' },
];

export default function SchoolReports() {
    const [selectedReport, setSelectedReport] = useState('annual-result');
    const [showReport, setShowReport] = useState(false);

    const renderReport = () => {
        switch (selectedReport) {
            case 'annual-result':
                return <ReportCard />;
            case 'marksheet':
                return <Marksheet />;
            default:
                return (
                    <Card>
                        <CardContent className="p-6">
                            <p>The selected report format is not yet available.</p>
                        </CardContent>
                    </Card>
                );
        }
    }

    const sortedClasses = [...mockClasses].sort((a, b) => {
        const aNum = parseInt(a.name.split(' ')[1]);
        const bNum = parseInt(b.name.split(' ')[1]);
        return aNum - bNum;
    });

    return (
        <div className="space-y-4">
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2 md:col-span-1">
                            <Label>Report Format</Label>
                            <Select value={selectedReport} onValueChange={setSelectedReport}>
                                <SelectTrigger><SelectValue placeholder="Select format" /></SelectTrigger>
                                <SelectContent>
                                    {reportFormats.map(format => (
                                        <SelectItem key={format.id} value={format.id}>{format.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Class</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                                <SelectContent>
                                    {sortedClasses.map(cls => (
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
                        <Button onClick={() => setShowReport(true)}>View Report</Button>
                    </div>
                </CardContent>
            </Card>

            {showReport && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Generated Report for Aarav Sharma</h2>
                        <div className="flex gap-2">
                            <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                            <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Export for DEO</Button>
                        </div>
                    </div>
                    {renderReport()}
                </div>
            )}
        </div>
    );
}

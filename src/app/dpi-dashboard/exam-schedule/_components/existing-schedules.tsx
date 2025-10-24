
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClasses, mockSubjects } from '@/lib/data';
import { ExamSchedule } from '@/lib/types';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface ExistingSchedulesProps {
    schedules: ExamSchedule[];
    onDeleteSchedule: (id: string) => void;
    isReadOnly?: boolean;
}

export default function ExistingSchedules({ schedules, onDeleteSchedule, isReadOnly = false }: ExistingSchedulesProps) {
    const [selectedClass, setSelectedClass] = useState('');

    const filteredSchedules = selectedClass ? schedules.filter(s => s.classId === selectedClass) : [];

    const getSubjectName = (id: string) => {
        return mockSubjects.find(s => s.id === id)?.name || 'Unknown Subject';
    }
    
    const sortedClasses = [...mockClasses].sort((a, b) => {
      const aNum = parseInt(a.name.split(' ')[1]);
      const bNum = parseInt(b.name.split(' ')[1]);
      return aNum - bNum;
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>View Existing Schedules</CardTitle>
                <CardDescription>Select a class to view its saved exam schedules.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                        <Label>Class</Label>
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortedClasses.map((cls) => (
                                    <SelectItem key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {selectedClass && filteredSchedules.length > 0 && (
                    <div className="space-y-4 pt-4">
                        {filteredSchedules.map(schedule => (
                             <Card key={schedule.id} className="overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-4">
                                     <CardTitle className="text-lg">
                                        Schedule for {mockClasses.find(c => c.id === schedule.classId)?.name} - {schedule.examType}
                                     </CardTitle>
                                     {!isReadOnly && (
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => onDeleteSchedule(schedule.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                     )}
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Subject</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Start Time</TableHead>
                                                <TableHead>End Time</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {schedule.details.map(detail => (
                                                <TableRow key={detail.subjectId}>
                                                    <TableCell>{getSubjectName(detail.subjectId)}</TableCell>
                                                    <TableCell>{new Date(detail.date).toLocaleDateString()}</TableCell>
                                                    <TableCell>{detail.startTime}</TableCell>
                                                    <TableCell>{detail.endTime}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
                 {selectedClass && filteredSchedules.length === 0 && (
                    <div className="pt-8 text-center text-muted-foreground">
                        No schedules found for the selected class.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

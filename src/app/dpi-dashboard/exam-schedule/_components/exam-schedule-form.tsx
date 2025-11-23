
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockClasses, mockExams, getSubjects } from '@/lib/data';
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ExamSchedule, Subject } from '@/lib/types';

type ScheduleRow = {
  id: number;
  subjectId: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
};

interface ExamScheduleFormProps {
    onAddSchedule: (schedule: ExamSchedule) => void;
}

export default function ExamScheduleForm({ onAddSchedule }: ExamScheduleFormProps) {
  const [selectedExamType, setSelectedExamType] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [scheduleRows, setScheduleRows] = useState<ScheduleRow[]>([]);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    setAllSubjects(getSubjects());
  }, []);

  const handleOpenModal = () => {
    if (selectedExamType && selectedClass && selectedYear && selectedMedium) {
        setScheduleRows([{ id: 1, subjectId: '', date: undefined, startTime: '', endTime: '' }]);
        setModalOpen(true);
    }
  };

  const handleAddRow = () => {
    setScheduleRows([
      ...scheduleRows,
      { id: Date.now(), subjectId: '', date: undefined, startTime: '', endTime: '' },
    ]);
  };
  
  const handleRemoveRow = (id: number) => {
    setScheduleRows(scheduleRows.filter(row => row.id !== id));
  }

  const handleScheduleChange = (id: number, field: keyof Omit<ScheduleRow, 'id'>, value: any) => {
      setScheduleRows(scheduleRows.map(row => row.id === id ? { ...row, [field]: value } : row));
  }
  
  const handleSaveSchedule = () => {
    const newSchedule: ExamSchedule = {
        id: `SCHED${Date.now()}`,
        classId: selectedClass,
        examType: selectedExamType,
        details: scheduleRows
            .filter(row => row.subjectId && row.date)
            .map(row => ({
                subjectId: row.subjectId,
                date: format(row.date!, 'yyyy-MM-dd'),
                startTime: row.startTime,
                endTime: row.endTime,
            })),
    };

    onAddSchedule(newSchedule);
    setModalOpen(false);
  }

  const classSubjects = mockClasses.find(c => c.id === selectedClass)?.subjects || allSubjects;
  
  const sortedClasses = [...mockClasses].sort((a, b) => {
      const aNum = parseInt(a.name.split(' ')[1]);
      const bNum = parseInt(b.name.split(' ')[1]);
      return aNum - bNum;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="space-y-2">
            <Label>Academic Year</Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
          <Label>Exam Type</Label>
          <Select value={selectedExamType} onValueChange={setSelectedExamType}>
            <SelectTrigger>
              <SelectValue placeholder="Select exam type" />
            </SelectTrigger>
            <SelectContent>
              {mockExams.map((exam) => (
                <SelectItem key={exam.id} value={exam.type}>
                  {exam.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
        <div className="space-y-2">
            <Label>Medium</Label>
            <Select value={selectedMedium} onValueChange={setSelectedMedium}>
                <SelectTrigger><SelectValue placeholder="Select medium" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button onClick={handleOpenModal} disabled={!selectedExamType || !selectedClass || !selectedYear || !selectedMedium}>
          Set Schedule
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Exam Schedule</DialogTitle>
            <DialogDescription>
              Add subjects and their corresponding exam dates and times for{' '}
              <span className="font-semibold text-primary">{mockClasses.find(c => c.id === selectedClass)?.name}</span> -{' '}
              <span className="font-semibold text-primary">{selectedExamType}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-500 text-white hover:bg-orange-500/90">
                  <TableHead className="w-[40%] text-white">Subject</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Start Time</TableHead>
                  <TableHead className="text-white">End Time</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Select value={row.subjectId} onValueChange={(value) => handleScheduleChange(row.id, 'subjectId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {classSubjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !row.date && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {row.date ? format(row.date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={row.date}
                            onSelect={(date) => handleScheduleChange(row.id, 'date', date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <Input type="time" value={row.startTime} onChange={(e) => handleScheduleChange(row.id, 'startTime', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <Input type="time" value={row.endTime} onChange={(e) => handleScheduleChange(row.id, 'endTime', e.target.value)} />
                    </TableCell>
                     <TableCell>
                        {scheduleRows.length > 1 && (
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemoveRow(row.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outline" size="sm" onClick={handleAddRow} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Row
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveSchedule}>Save Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

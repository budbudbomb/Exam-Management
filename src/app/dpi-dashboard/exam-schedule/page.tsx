
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ExamScheduleForm from './_components/exam-schedule-form';
import ExistingSchedules from './_components/existing-schedules';
import React, { useState } from 'react';
import { ExamSchedule } from '@/lib/types';
import { mockSchedules } from '@/lib/data';

export default function ExamSchedulePage() {
  const [schedules, setSchedules] = useState<ExamSchedule[]>(mockSchedules);

  const handleAddSchedule = (newSchedule: ExamSchedule) => {
    setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  }

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
            <ExamScheduleForm onAddSchedule={handleAddSchedule} />
        </CardContent>
      </Card>

      <ExistingSchedules schedules={schedules} onDeleteSchedule={handleDeleteSchedule} />
    </div>
  );
}


'use client';

import { useState } from 'react';
import ExistingSchedules from '@/app/dpi-dashboard/exam-schedule/_components/existing-schedules';
import { mockSchedules } from '@/lib/data';
import { ExamSchedule } from '@/lib/types';

export default function ViewExamSchedulePage() {
  const [schedules] = useState<ExamSchedule[]>(mockSchedules);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">View Exam Schedule</h1>
        <p className="text-muted-foreground">
          View the exam schedules published by the administration.
        </p>
      </div>
      <ExistingSchedules schedules={schedules} onDeleteSchedule={() => {}} isReadOnly={true} />
    </div>
  );
}

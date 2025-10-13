'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateReportAction, ActionState } from '../_actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';

const sampleData = JSON.stringify(
  {
    studentId: 'S-123',
    studentName: 'Jane Doe',
    class: '10th Grade',
    subjects: [
      { name: 'Math', score: 85, grade: 'B', comments: 'Good understanding of core concepts.' },
      { name: 'Science', score: 92, grade: 'A', comments: 'Excellent performance in practicals.' },
      { name: 'History', score: 78, grade: 'C', comments: 'Needs to improve on date memorization.' },
    ],
    attendance: '95%',
    overallGrade: 'B+',
  },
  null,
  2
);

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Report'
      )}
    </Button>
  );
}

export default function GeneratorForm() {
  const initialState: ActionState = { status: 'initial', data: null, error: null };
  const [state, formAction] = useFormState(generateReportAction, initialState);

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="studentPerformanceData">Student Performance Data (JSON)</Label>
                <Textarea
                id="studentPerformanceData"
                name="studentPerformanceData"
                placeholder="Enter JSON data here"
                className="min-h-[250px] font-mono text-xs"
                defaultValue={sampleData}
                />
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="audience">Intended Audience</Label>
                    <Select name="audience" defaultValue="students">
                        <SelectTrigger id="audience">
                        <SelectValue placeholder="Select an audience" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                        <SelectItem value="regulatory bodies">Regulatory Bodies</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="pt-6">
                    <SubmitButton />
                </div>
            </div>
        </div>
      </form>

      {state.status === 'error' && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.status === 'success' && state.data && (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Generated Suggestions</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Suggested Layout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{state.data.reportLayout}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Suggested Format</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-lg text-primary">{state.data.reportFormat}</p>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Suggested Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="whitespace-pre-wrap font-sans text-sm bg-muted p-4 rounded-md">{state.data.reportContent}</pre>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}
    </div>
  );
}

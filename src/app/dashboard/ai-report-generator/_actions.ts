'use server';

import { generateTailoredReport, GenerateTailoredReportInput, GenerateTailoredReportOutput } from '@/ai/flows/generate-tailored-reports';

export type ActionState = {
  status: 'initial' | 'running' | 'success' | 'error';
  data: GenerateTailoredReportOutput | null;
  error: string | null;
};

export async function generateReportAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const studentPerformanceData = formData.get('studentPerformanceData') as string;
  const audience = formData.get('audience') as 'students' | 'parents' | 'regulatory bodies';

  if (!studentPerformanceData || !audience) {
    return {
      status: 'error',
      data: null,
      error: 'Invalid input. Please provide both student data and an audience.',
    };
  }

  try {
    const input: GenerateTailoredReportInput = {
      studentPerformanceData,
      audience,
    };
    const output = await generateTailoredReport(input);
    return {
      status: 'success',
      data: output,
      error: null,
    };
  } catch (e: any) {
    return {
      status: 'error',
      data: null,
      error: e.message || 'An unknown error occurred.',
    };
  }
}

'use server';

/**
 * @fileOverview An AI agent that generates tailored reports based on student performance data and audience.
 *
 * - generateTailoredReport - A function that generates a tailored report.
 * - GenerateTailoredReportInput - The input type for the generateTailoredReport function.
 * - GenerateTailoredReportOutput - The return type for the generateTailoredReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTailoredReportInputSchema = z.object({
  studentPerformanceData: z
    .string()
    .describe('The student performance data in JSON format.'),
  audience: z
    .enum(['students', 'parents', 'regulatory bodies'])
    .describe('The intended audience for the report.'),
});
export type GenerateTailoredReportInput = z.infer<
  typeof GenerateTailoredReportInputSchema
>;

const GenerateTailoredReportOutputSchema = z.object({
  reportLayout: z.string().describe('The suggested report layout.'),
  reportFormat: z.string().describe('The suggested report format.'),
  reportContent: z.string().describe('The generated report content.'),
});
export type GenerateTailoredReportOutput = z.infer<
  typeof GenerateTailoredReportOutputSchema
>;

export async function generateTailoredReport(
  input: GenerateTailoredReportInput
): Promise<GenerateTailoredReportOutput> {
  return generateTailoredReportFlow(input);
}

const generateTailoredReportPrompt = ai.definePrompt({
  name: 'generateTailoredReportPrompt',
  input: {schema: GenerateTailoredReportInputSchema},
  output: {schema: GenerateTailoredReportOutputSchema},
  prompt: `You are an AI assistant that helps teachers and administrators generate tailored reports for different audiences based on student performance data.

Analyze the following student performance data:
{{{studentPerformanceData}}}

Considering the intended audience is: {{{audience}}},
suggest the most appropriate report layout, format, and content.

Ensure the report effectively communicates student progress and achievements to the intended audience.

Output the report layout, format and the key sections to be included in the content. Only include sections that are relevant to the audience.

Here is an example of a good output. It provides a good amount of details about what should be included:

{
  "reportLayout": "Traditional table-based layout with clear headings and subheadings",
  "reportFormat": "PDF",
  "reportContent": "1. Student Information (Name, Class, Roll Number)\n2. Subject-wise Performance (Marks, Grade, Percentage)\n3. Overall Grade and Division\n4. Teacher's Remarks\n5. Attendance Record"
}
`,
});

const generateTailoredReportFlow = ai.defineFlow(
  {
    name: 'generateTailoredReportFlow',
    inputSchema: GenerateTailoredReportInputSchema,
    outputSchema: GenerateTailoredReportOutputSchema,
  },
  async input => {
    const {output} = await generateTailoredReportPrompt(input);
    return output!;
  }
);

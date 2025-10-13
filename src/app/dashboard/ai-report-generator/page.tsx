import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GeneratorForm from "./_components/generator-form";
import { Bot } from "lucide-react";

export default function AiReportGeneratorPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Bot className="h-8 w-8 text-primary" />
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">AI Report Generator</h1>
            <p className="text-muted-foreground">
                Generate tailored report suggestions based on student performance and audience.
            </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Generate Tailored Report</CardTitle>
            <CardDescription>
                Provide student performance data in JSON format and select the intended audience. The AI will suggest the most effective report layout, format, and content.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <GeneratorForm />
        </CardContent>
      </Card>
    </div>
  );
}

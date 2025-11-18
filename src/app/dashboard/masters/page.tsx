
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SubjectMasterForm from './_components/subject-master-form';

export default function MastersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Subject Master</h1>
        <p className="text-muted-foreground">
          Configure which subjects are offered for each class.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <SubjectMasterForm />
        </CardContent>
      </Card>
    </div>
  );
}

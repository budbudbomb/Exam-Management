
'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import SubjectsForm from './_components/subjects-form';
import ExamsForm from './_components/exams-form';
import GradesForm from './_components/grades-form';
import RemarksForm from './_components/remarks-form';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react';


export default function MastersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'subjects';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    // Remove view when changing tabs
    params.delete('view');
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Masters Configuration</h1>
        <p className="text-muted-foreground">
          Configure the core entities of the school management system.
        </p>
      </div>
      <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange} className="space-y-4">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm -mx-6 px-6 py-2 border-b">
          <TabsList>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="remarks">Remarks</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="subjects" className="space-y-4 mt-0">
          <SubjectsForm />
        </TabsContent>
        <TabsContent value="exams" className="space-y-4 mt-0">
          <ExamsForm />
        </TabsContent>
        <TabsContent value="grades" className="space-y-4 mt-0">
          <GradesForm />
        </TabsContent>
        <TabsContent value="remarks" className="space-y-4 mt-0">
          <RemarksForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}


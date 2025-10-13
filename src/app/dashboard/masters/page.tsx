import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SubjectsForm from './_components/subjects-form';
import ExamsForm from './_components/exams-form';
import ClassesForm from './_components/classes-form';
import StudentsTable from './_components/students-table';


export default function MastersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Masters Configuration</h1>
      <p className="text-muted-foreground">
        Configure the core entities of the school management system.
      </p>
      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="subjects" className="space-y-4">
          <SubjectsForm />
        </TabsContent>
        <TabsContent value="exams" className="space-y-4">
          <ExamsForm />
        </TabsContent>
        <TabsContent value="classes" className="space-y-4">
          <ClassesForm />
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <StudentsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

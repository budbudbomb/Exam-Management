
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockRemarks } from '@/lib/data';
import { Remark } from '@/lib/types';
import { FilePlus2, PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';

export default function RemarksForm() {
    const [remarks, setRemarks] = React.useState<Remark[]>(mockRemarks);

    const handleAddRemark = () => {
        const newRemark: Remark = { abbreviation: '', description: '' };
        setRemarks([...remarks, newRemark]);
    };

    const handleRemarkChange = (index: number, field: keyof Remark, value: string) => {
        const newRemarks = [...remarks];
        (newRemarks[index] as any)[field] = value;
        setRemarks(newRemarks);
    };

    const handleDeleteRemark = (index: number) => {
        const newRemarks = [...remarks];
        newRemarks.splice(index, 1);
        setRemarks(newRemarks);
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Remark Configuration</CardTitle>
                    <CardDescription>Define remark abbreviations and their full descriptions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {remarks.map((remark, index) => (
                        <div key={index} className="flex items-end gap-4">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`remark-abbreviation-${index}`}>Abbreviation</Label>
                                <Input
                                    id={`remark-abbreviation-${index}`}
                                    value={remark.abbreviation}
                                    onChange={(e) => handleRemarkChange(index, 'abbreviation', e.target.value)}
                                    placeholder="e.g. DISTN"
                                />
                            </div>
                            <div className="flex-[2] space-y-2">
                                <Label htmlFor={`remark-description-${index}`}>Full Description</Label>
                                <Input
                                    id={`remark-description-${index}`}
                                    value={remark.description}
                                    onChange={(e) => handleRemarkChange(index, 'description', e.target.value)}
                                    placeholder="e.g. Distinction"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteRemark(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddRemark}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Remark
                    </Button>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>
                    <FilePlus2 className="mr-2 h-4 w-4" /> Save Remark Changes
                </Button>
            </div>
        </div>
    );
}

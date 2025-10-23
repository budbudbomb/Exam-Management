
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Gauge,
  Book,
  Users,
  ClipboardEdit,
  FileText,
  Bot,
  GraduationCap,
  BookOpen,
  School as SchoolIcon,
  User,
  UserCheck,
} from 'lucide-react';
import { Logo } from '../icons/logo';
import { useState } from 'react';

const navLinks = [
  {
    href: '/dashboard',
    icon: <Gauge className="h-4 w-4" />,
    label: 'Dashboard',
  },
  {
    isAccordion: true,
    label: 'Exam Management',
    icon: <GraduationCap className="h-4 w-4" />,
    subLinks: [
      {
        href: '/dashboard/masters',
        icon: <BookOpen className="h-4 w-4" />,
        label: 'Masters',
      },
      {
        href: '/dashboard/student-verification',
        icon: <UserCheck className="h-4 w-4" />,
        label: 'Student Verification',
      },
      {
        href: '/dashboard/student-details-update',
        icon: <User className="h-4 w-4" />,
        label: 'Student Details update',
      },
      {
        href: '/dashboard/marks-entry',
        icon: <ClipboardEdit className="h-4 w-4" />,
        label: 'Marks Entry',
      },
      {
        href: '/dashboard/reports',
        icon: <FileText className="h-4 w-4" />,
        label: 'Report Cards',
      },
    ],
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [currentDate] = useState(new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }));


  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-[88px] items-center bg-sidebar px-4 lg:px-6 flex-col justify-center border-b border-sidebar-border">
         <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
          <Logo className="h-10 w-10 text-white" />
          <div className='flex flex-col'>
            <span className="text-sm">Madhya Pradesh</span>
            <span className="text-xl font-bold">Education Portal 3.0</span>
          </div>
        </Link>
      </div>
      <div className="h-8 bg-white text-orange-500 flex items-center justify-center text-sm font-semibold border-b border-sidebar-border">
        {currentDate}
      </div>
      <div className="flex-1 bg-sidebar-accent">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-2">
          {navLinks.map((link) =>
            link.isAccordion && link.subLinks ? (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={link.label}
                defaultValue={link.subLinks.some(sub => pathname.startsWith(sub.href)) ? "item-1" : undefined}
              >
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-primary-foreground transition-all hover:bg-sidebar/80 hover:text-sidebar-accent-foreground hover:no-underline [&[data-state=open]]:bg-sidebar/80 [&[data-state=open]]:text-sidebar-accent-foreground [&[data-state=open]>svg:last-child]:-rotate-90">
                    {link.icon}
                    {link.label}
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 pt-2">
                    <nav className="grid gap-1">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar/80 hover:text-sidebar-accent-foreground',
                            pathname.startsWith(subLink.href) && 'bg-sidebar/80 text-sidebar-accent-foreground'
                          )}
                        >
                          {subLink.icon}
                          {subLink.label}
                        </Link>
                      ))}
                    </nav>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar/80 hover:text-sidebar-accent-foreground',
                  pathname === link.href && 'bg-sidebar/80 text-sidebar-accent-foreground'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
      <div className="mt-auto p-4 bg-sidebar-accent">
          <div className="flex items-center gap-2">
            <select className="w-full bg-sidebar text-sidebar-foreground text-sm rounded-md border-0 p-2 focus:ring-0">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
    </div>
  );
}

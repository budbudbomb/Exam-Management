
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  ListChecks,
  BookMark,
  Library,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const examManagementLinks = {
    isAccordion: true,
    label: 'Exam Management',
    icon: <GraduationCap className="h-4 w-4" />,
    subLinks: [
      {
        href: '/dpi-dashboard/masters',
        icon: <BookOpen className="h-4 w-4" />,
        label: 'Masters',
      },
      {
        href: '/dpi-dashboard/exam-schedule',
        icon: <CalendarDays className="h-4 w-4" />,
        label: 'Exam Schedule',
      },
    ],
};

const mastersLinks = {
    isAccordion: true,
    label: 'Masters',
    icon: <Library className="h-4 w-4" />,
    subLinks: [
      {
        href: '/dpi-dashboard/masters?tab=subjects',
        icon: <BookOpen className="h-4 w-4" />,
        label: 'Subjects',
      },
      {
        href: '/dpi-dashboard/masters?tab=exams',
        icon: <ListChecks className="h-4 w-4" />,
        label: 'Exams',
      },
      {
        href: '/dpi-dashboard/masters?tab=grades',
        icon: <GraduationCap className="h-4 w-4" />,
        label: 'Grades',
      },
      {
        href: '/dpi-dashboard/masters?tab=remarks',
        icon: <BookMark className="h-4 w-4" />,
        label: 'Remarks',
      },
    ],
};

const navLinks = [examManagementLinks, mastersLinks];

export default function DpiNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  
  const [currentDate] = useState(new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }));

  const isLinkActive = (href: string) => {
    const [basePath, params] = href.split('?');
    if (pathname !== basePath) {
      return false;
    }
    if (params) {
      const urlParams = new URLSearchParams(params);
      const tabParam = urlParams.get('tab');
      return tab === tabParam;
    }
    // If we are on /dpi-dashboard/masters and there is no tab, we can default to subjects being active.
    if(pathname === '/dpi-dashboard/masters' && !tab) {
        return href.includes('subjects');
    }
    
    return !params;
  };

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-[88px] items-center bg-sidebar px-4 lg:px-6 flex-col justify-center border-b border-sidebar-border">
         <Link href="/dpi-dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
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
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-1">
          {navLinks.map((link) =>
            link.isAccordion && link.subLinks ? (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={link.label}
                defaultValue={link.subLinks.some(sub => isLinkActive(sub.href)) ? link.label : undefined}
              >
                <AccordionItem value={link.label} className="border-b-0">
                  <AccordionTrigger className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-primary-foreground transition-all hover:bg-sidebar hover:text-sidebar-accent-foreground hover:no-underline [&[data-state=open]]:bg-sidebar [&[data-state=open]]:text-sidebar-accent-foreground [&[data-state=open]>svg:last-child]:-rotate-90">
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
                            'flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar hover:text-sidebar-accent-foreground',
                            isLinkActive(subLink.href) && 'bg-sidebar text-sidebar-accent-foreground'
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
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar hover:text-sidebar-accent-foreground',
                  pathname === link.href && 'bg-sidebar text-sidebar-accent-foreground'
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

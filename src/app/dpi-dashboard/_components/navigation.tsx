
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  ListChecks,
  Bookmark,
  Library,
  LogOut,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const navLinks = [
    {
    label: 'Main Menu',
    isHeading: true,
    items: [
        {
            isAccordion: true,
            label: 'Exam Management',
            icon: <GraduationCap className="h-4 w-4" />,
            subLinks: [
            {
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
                    icon: <Bookmark className="h-4 w-4" />,
                    label: 'Remarks',
                },
                ],
            },
            {
                href: '/dpi-dashboard/exam-schedule',
                icon: <CalendarDays className="h-4 w-4" />,
                label: 'Exam Schedule',
            },
            ],
        },
    ]}
];


export default function DpiNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

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
    if(pathname === '/dpi-dashboard/masters' && !tab) {
        return href.includes('subjects');
    }
    
    return !params;
  };
  
  const isParentActive = (links: any[]): boolean => {
    return links.some(link => {
      if (link.subLinks) {
        return isParentActive(link.subLinks);
      }
      return link.href && isLinkActive(link.href);
    });
  }

  const renderNav = (items: any[]) => {
    return items.map((link) => {
      if (link.isHeading) {
        return (
          <div key={link.label} className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {link.label}
          </div>
        )
      }
      
      if (link.isAccordion && link.subLinks) {
        return (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            key={link.label}
            defaultValue={isParentActive(link.subLinks) ? link.label : undefined}
          >
            <AccordionItem value={link.label} className="border-b-0">
              <AccordionTrigger 
                className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline",
                  isParentActive(link.subLinks) && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                {link.icon}
                {link.label}
              </AccordionTrigger>
              <AccordionContent className="ml-4 border-l border-border pl-4">
                <nav className="grid gap-1 py-1">
                  {renderNav(link.subLinks)}
                </nav>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }
      
      return (
        <Link
          key={link.href}
          href={link.href!}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            isLinkActive(link.href) && 'bg-sidebar-accent text-sidebar-accent-foreground'
          )}
        >
          {link.icon}
          {link.label}
        </Link>
      );
    });
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-4 lg:px-6 border-b border-sidebar-border">
         <Link href="/dpi-dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
          <Logo className="h-8 w-8 text-primary" />
           <span className="text-lg font-bold">EduReport Pro (DPI)</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-1">
          {navLinks.map((section) => (
             <div key={section.label} className="space-y-1">
              {section.isHeading && (
                <h2 className="px-4 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.label}
                </h2>
              )}
              {renderNav(section.items)}
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}

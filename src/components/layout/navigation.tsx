
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
} from 'lucide-react';
import { Logo } from '../icons/logo';

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
        href: '/dashboard/marks-entry',
        icon: <ClipboardEdit className="h-4 w-4" />,
        label: 'Marks Entry',
      },
      {
        href: '/dashboard/student-details-update',
        icon: <User className="h-4 w-4" />,
        label: 'Student Details update',
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

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4 lg:h-[60px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline text-sidebar-primary-foreground">
          <Logo className="h-6 w-6 text-sidebar-primary-foreground" />
          <span className="">EduReport Pro</span>
        </Link>
      </div>
      <div className="flex-1">
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
                  <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-primary-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline [&[data-state=open]]:bg-sidebar-accent [&[data-state=open]]:text-sidebar-accent-foreground [&[data-state=open]>svg:last-child]:-rotate-90">
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
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                            pathname.startsWith(subLink.href) && 'bg-sidebar-accent text-sidebar-accent-foreground'
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
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  pathname === link.href && 'bg-sidebar-accent text-sidebar-accent-foreground'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
}

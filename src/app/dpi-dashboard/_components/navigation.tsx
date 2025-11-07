
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
  CircleUser,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';

const navLinks = [
    {
    label: 'Main Menu',
    isHeading: true,
    items: [
        {
            isAccordion: true,
            label: 'Exam Management',
            icon: <GraduationCap className="h-4 w-4" />,
            tooltip: 'Exam Management',
            subLinks: [
              {
                  isAccordion: true,
                  label: 'Masters',
                  icon: <Library className="h-4 w-4" />,
                  tooltip: 'Masters',
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
  const { state } = useSidebar();

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

  const renderNav = (items: any[], level = 0) => {
    return items.map((link, index) => {
      if (link.isAccordion && link.subLinks) {
        const defaultOpenValue = isParentActive(link.subLinks) ? `item-${level}-${index}` : undefined;
        return (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            key={`${level}-${index}`}
            defaultValue={defaultOpenValue}
          >
            <AccordionItem value={`item-${level}-${index}`} className="border-b-0">
                <AccordionTrigger asChild>
                    <SidebarMenuButton 
                        className="w-full justify-between"
                        isActive={isParentActive(link.subLinks)}
                        tooltip={link.tooltip}
                    >
                        <>
                          <div className="flex flex-grow items-center gap-3">
                              {link.icon}
                              {state === 'expanded' && <span className="text-left">{link.label}</span>}
                          </div>
                          {state === 'expanded' && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
                        </>
                    </SidebarMenuButton>
                </AccordionTrigger>
              <AccordionContent className="p-0">
                <SidebarMenuSub>
                  {renderNav(link.subLinks, level + 1)}
                </SidebarMenuSub>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }
      
      return (
        <li key={index}>
            <Link href={link.href!} passHref>
                <SidebarMenuSubButton asChild isActive={isLinkActive(link.href!)}>
                    <a>
                        {link.icon}
                        {state === 'expanded' && <span>{link.label}</span>}
                    </a>
                </SidebarMenuSubButton>
            </Link>
        </li>
      );
    });
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-4 lg:px-6 border-b border-sidebar-border">
         <Link href="/dpi-dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
          <Logo className="h-8 w-8 text-primary" />
           {state === 'expanded' && <span className="text-lg font-bold">EduReport Pro (DPI)</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="px-2 lg:px-4 py-4 gap-1 text-sm font-medium">
          {navLinks.map((section, sectionIndex) => (
             <SidebarGroup key={sectionIndex}>
                {section.isHeading && state === 'expanded' && (
                  <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <ul className="flex w-full min-w-0 flex-col gap-1">{renderNav(section.items)}</ul>
                </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </div>
      <div className="mt-auto p-4 border-t border-sidebar-border">
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-full"
              >
                <CircleUser className="mr-2 h-5 w-5" />
                {state === 'expanded' && <span>My Account</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mb-2 w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </div>
  );
}

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
)

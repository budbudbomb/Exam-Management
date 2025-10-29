
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  ClipboardEdit,
  LogOut,
  CircleUser,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const navLinks = [
    {
    label: 'Main Menu',
    isHeading: true,
    items: [
        {
            href: '/sankool-dashboard',
            icon: <ClipboardEdit className="h-4 w-4" />,
            label: 'Marks verification',
        },
    ]
  }
];

export default function SankoolNavigation() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-4 lg:px-6 border-b border-sidebar-border">
         <Link href="/sankool-dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-lg font-bold">EduReport Pro</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-1">
          {navLinks.map((section) => (
             <div key={section.label} className="space-y-1">
                <h2 className="px-4 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.label}
                </h2>
                {section.items.map(link => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        'flex items-center gap-3 rounded-full px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        pathname === link.href && 'bg-sidebar-accent text-sidebar-accent-foreground'
                    )}
                    >
                    {link.icon}
                    {link.label}
                    </Link>
                ))}
            </div>
          ))}
        </nav>
      </div>
       <div className="mt-auto p-4 border-t border-sidebar-border">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-full"
              >
                <CircleUser className="mr-2 h-5 w-5" />
                My Account
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

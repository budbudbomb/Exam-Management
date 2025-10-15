
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { User, Lock, RefreshCcw, KeyRound, Eye, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LoginPage() {
  const [captcha, setCaptcha] = useState('');

  const refreshCaptcha = () => {
    setCaptcha(Math.random().toString().substring(2, 8));
  };
  
  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-header-start to-header-end text-white py-3 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold">स्कूल शिक्षा विभाग, मध्य प्रदेश</h1>
          <p className="text-sm md:text-base">एजुकेशन पोर्टल 3.0</p>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 flex-col lg:flex-row items-center p-4 gap-8">
        <div className="w-full lg:w-1/2 flex items-center justify-center" />

        <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm mt-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">User Login</h2>
                 </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username">User Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input id="username" type="text" placeholder="User Name" className="pl-10" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                         <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input id="password" type="password" placeholder="Password" className="pl-10 pr-10" required />
                            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
                        </div>
                    </div>
                     <div className="space-y-2">
                         <Label htmlFor="captcha-input">Captcha</Label>
                         <div className="flex items-center gap-4">
                            <div className="flex-1">
                                 <div className="bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center h-10">
                                     <span className="text-red-500 font-bold text-2xl tracking-widest" style={{fontFamily: 'monospace', textShadow: '1px 1px 1px rgba(0,0,0,0.1)'}}>{captcha}</span>
                                 </div>
                            </div>
                            <Button variant="ghost" size="icon" type="button" onClick={refreshCaptcha}>
                                <RefreshCcw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </Button>
                         </div>
                        <Input id="captcha-input" type="text" placeholder="Enter Captcha" required />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full text-white bg-gradient-to-r from-btn-start to-btn-end hover:from-btn-start/90 hover:to-btn-end/90 font-semibold">
                          <KeyRound className="mr-2 h-4 w-4" />
                          Login As
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full max-w-sm">
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="cursor-pointer">School</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/pariksha-prabhar-dashboard" className="cursor-pointer">Pariksha Prabhari</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/sankool-dashboard" className="cursor-pointer">Sankool</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>DEO</DropdownMenuItem>
                        <DropdownMenuItem>DPI</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                </form>
            </div>
        </div>
      </main>

        <footer className="w-full py-4 mt-auto">
            <div className="container mx-auto flex flex-wrap justify-center gap-2 md:gap-4">
                <Button variant="outline" size="sm">Forgot Password</Button>
                <Button variant="outline" size="sm">अतिथि शिक्षक पोर्टल</Button>
                <Button variant="outline" size="sm">प्रोजेक्ट अतिथि शिक्षक पोर्टल</Button>
                <Button variant="outline" size="sm">हमारे-शिक्षक ऐप</Button>
                <Button variant="outline" size="sm">चाइल्ड ट्रैकिंग ऐप</Button>
                <Button variant="outline" size="sm">FAQ</Button>
            </div>
             <p className="text-center text-sm text-gray-500 mt-4">पोर्टल से संबंधित समस्या के लिए आप help</p>
        </footer>
    </div>
  );
}

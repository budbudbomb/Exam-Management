
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { User, Lock, RefreshCcw, KeyRound, Eye } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [captcha, setCaptcha] = useState('513532');

  const refreshCaptcha = () => {
    setCaptcha(Math.random().toString().substring(2, 8));
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold">स्कूल शिक्षा विभाग, मध्य प्रदेश</h1>
          <p className="text-sm md:text-base">एजुकेशन पोर्टल 3.0</p>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 flex-col lg:flex-row items-center justify-center p-4 gap-8">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                 <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">User Login</h2>
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

                    <Button type="submit" className="w-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-semibold" asChild>
                       <Link href="/dashboard">
                        <KeyRound className="mr-2 h-4 w-4" />
                        Login
                       </Link>
                    </Button>
                </form>
            </div>
        </div>
      </main>

        <footer className="w-full py-4">
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

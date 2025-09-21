
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.94 11c-.1-2.02-.91-3.82-2.31-5.22a8.87 8.87 0 0 0-13.26 0 8.87 8.87 0 0 0 0 13.26 8.87 8.87 0 0 0 5.22 2.31c2.02.1 3.82-.91 5.22-2.31l-1.42-1.42a5.32 5.32 0 0 1-7.59 0 5.32 5.32 0 0 1 0-7.59 5.32 5.32 0 0 1 7.59 0c.35.35.63.76.84 1.21h-2.13v2h4.55a4.47 4.47 0 0 1-.22 1.62z"/></svg>
    )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
            <CardDescription>Log in to access your account and orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Mobile Number</Label>
                <Input id="email" type="text" placeholder="you@example.com or 9876543210" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password"  className="text-xs text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="keep-logged-in" />
                <Label htmlFor="keep-logged-in" className="text-sm font-normal">Keep me logged in</Label>
              </div>
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="space-y-4">
                <Button variant="outline" className="w-full">
                    <GoogleIcon className="mr-2 h-5 w-5"/>
                    Continue with Google
                </Button>
                 <Button variant="outline" className="w-full">
                    <FacebookIcon className="mr-2 h-5 w-5"/>
                    Continue with Facebook
                </Button>
            </div>
            
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

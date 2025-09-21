
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CheckCircle } from 'lucide-react';

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

const TEMP_OTP = '123456';

export default function SignupPage() {
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const isEmailValid = useMemo(() => /^\S+@\S+\.\S+$/.test(email), [email]);
  const isMobileValid = useMemo(() => /^\d{10}$/.test(mobile), [mobile]);

  const handleSendOtp = (type: 'email' | 'mobile') => {
    // In a real app, this would call an API to send an OTP
    console.log(`Sending OTP to ${type}...`);
    if (type === 'email') setEmailOtpSent(true);
    if (type === 'mobile') setMobileOtpSent(true);
  };

  const handleVerifyOtp = (type: 'email' | 'mobile') => {
    if (type === 'email') {
      if (emailOtp === TEMP_OTP) {
        setEmailVerified(true);
        console.log('Email verified!');
      } else {
        alert('Invalid email OTP');
      }
    }
    if (type === 'mobile') {
      if (mobileOtp === TEMP_OTP) {
        setMobileVerified(true);
        console.log('Mobile verified!');
      } else {
        alert('Invalid mobile OTP');
      }
    }
  };

  const isSignupEnabled = useMemo(() => {
    return emailVerified || mobileVerified;
  }, [emailVerified, mobileVerified]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
       <div className="w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
            <CardDescription>Join us to get personalized recommendations and faster checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
               <div className="space-y-3">
                <Label>I am signing up as a...</Label>
                <RadioGroup defaultValue="customer" value={role} onValueChange={setRole} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="customer" id="customer" className="peer sr-only" />
                    <Label
                      htmlFor="customer"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Customer
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                    <Label
                      htmlFor="admin"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Admin
                    </Label>
                  </div>
                </RadioGroup>
                 <p className="text-xs text-muted-foreground">
                    {role === 'admin' 
                      ? 'Admin accounts require approval from a super-admin.'
                      : 'Get access to your orders, wishlist, and recommendations.'
                    }
                 </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>

               <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2">
                    <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={emailVerified} />
                    {!emailVerified && (
                      <Button type="button" onClick={() => handleSendOtp('email')} disabled={!isEmailValid || emailOtpSent}>
                        {emailOtpSent ? 'Sent' : 'Send OTP'}
                      </Button>
                    )}
                     {emailVerified && <CheckCircle className="h-6 w-6 text-green-500 self-center" />}
                  </div>
                </div>

                {emailOtpSent && !emailVerified && (
                    <div className="space-y-2">
                        <Label htmlFor="email-otp">Email OTP</Label>
                        <div className="flex gap-2">
                            <Input id="email-otp" type="text" placeholder="Enter 6-digit OTP" value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} maxLength={6} />
                            <Button type="button" onClick={() => handleVerifyOtp('email')}>Verify OTP</Button>
                        </div>
                    </div>
                )}
                
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="flex gap-2">
                    <Input id="mobile" type="tel" placeholder="9876543210" required value={mobile} onChange={(e) => setMobile(e.target.value)} disabled={mobileVerified}/>
                    {!mobileVerified && (
                       <Button type="button" onClick={() => handleSendOtp('mobile')} disabled={!isMobileValid || mobileOtpSent}>
                        {mobileOtpSent ? 'Sent' : 'Send OTP'}
                      </Button>
                    )}
                    {mobileVerified && <CheckCircle className="h-6 w-6 text-green-500 self-center" />}
                </div>
              </div>

              {mobileOtpSent && !mobileVerified && (
                    <div className="space-y-2">
                        <Label htmlFor="mobile-otp">Mobile OTP</Label>
                        <div className="flex gap-2">
                            <Input id="mobile-otp" type="text" placeholder="Enter 6-digit OTP" value={mobileOtp} onChange={(e) => setMobileOtp(e.target.value)} maxLength={6} />
                            <Button type="button" onClick={() => handleVerifyOtp('mobile')}>Verify OTP</Button>
                        </div>
                    </div>
                )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={!isSignupEnabled}>
                {role === 'admin' ? 'Request Admin Account' : 'Create Account'}
              </Button>
            </form>

            <Separator className="my-6" />

             <div className="space-y-4">
                <Button variant="outline" className="w-full">
                    <GoogleIcon className="mr-2 h-5 w-5"/>
                    Sign up with Google
                </Button>
                 <Button variant="outline" className="w-full">
                    <FacebookIcon className="mr-2 h-5 w-5"/>
                    Sign up with Facebook
                </Button>
            </div>
            
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


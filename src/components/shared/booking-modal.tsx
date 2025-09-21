
'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import type { Carpenter } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const timeSlots = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
];

const distanceTiers = [
    { label: '0-25 km', fee: 200 },
    { label: '26-50 km', fee: 350 },
    { label: '51-200 km', fee: 500 },
];

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  carpenter: Carpenter;
};

export function BookingModal({ isOpen, onClose, carpenter }: BookingModalProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDistance, setSelectedDistance] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('later');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visitingFee = useMemo(() => {
    return distanceTiers.find(tier => tier.label === selectedDistance)?.fee || 0;
  }, [selectedDistance]);

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedDistance) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select a date, time, and distance.',
      });
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Booking Confirmed!',
        description: `Your booking with ${carpenter.name} on ${format(selectedDate, 'PPP')} at ${selectedTime} is confirmed.`,
      });
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book {carpenter.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date and time to confirm your booking.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Select Date</Label>
                <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !selectedDate && 'text-muted-foreground'
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    />
                </PopoverContent>
                </Popover>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="time-slot">Select Time Slot</Label>
                <Select onValueChange={setSelectedTime} value={selectedTime}>
                    <SelectTrigger id="time-slot">
                        <SelectValue placeholder="Choose a time..." />
                    </SelectTrigger>
                    <SelectContent>
                        {timeSlots.map(slot => (
                            <SelectItem key={slot} value={slot}>
                                <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {slot}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
          
           <div className="grid gap-2">
                <Label htmlFor="distance-tier">Distance from Shop</Label>
                <Select onValueChange={setSelectedDistance} value={selectedDistance}>
                    <SelectTrigger id="distance-tier">
                        <SelectValue placeholder="Select your distance..." />
                    </SelectTrigger>
                    <SelectContent>
                        {distanceTiers.map(tier => (
                            <SelectItem key={tier.label} value={tier.label}>
                                <div className="flex items-center">
                                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {tier.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <p className="text-xs text-muted-foreground">Our shop is located at Fazalganj, Sasaram.</p>
            </div>

            {selectedDistance && (
                <Alert>
                    <AlertTitle className="font-semibold">Visiting Charge</AlertTitle>
                    <AlertDescription>
                        An upfront visiting charge of <strong>₹{visitingFee}</strong> is applicable for the selected distance.
                    </AlertDescription>
                </Alert>
            )}
          
          <div className="grid gap-3">
             <Label>Payment Method</Label>
             <RadioGroup defaultValue="later" value={paymentMethod} onValueChange={setPaymentMethod} disabled={!selectedDistance}>
                <Card className={cn(!selectedDistance && 'opacity-50')}>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="now" id="r2" disabled={!selectedDistance} />
                            <Label htmlFor="r2" className={cn("flex-1", !selectedDistance && 'cursor-not-allowed')}>Pay Visiting Charge Now (₹{visitingFee}) <span className="text-xs text-muted-foreground block">Pay the one-time visiting fee upfront. Service charges extra.</span></Label>
                        </div>
                    </CardContent>
                </Card>
                <Card className={cn(!selectedDistance && 'opacity-50')}>
                     <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="later" id="r3" disabled={!selectedDistance} />
                            <Label htmlFor="r3" className={cn("flex-1", !selectedDistance && 'cursor-not-allowed')}>Pay on completion <span className="text-xs text-muted-foreground block">Pay visiting charge + service charge (₹{carpenter.hourlyRate}/hr) after work.</span></Label>
                        </div>
                    </CardContent>
                </Card>
             </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting || !selectedDistance}>
            {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

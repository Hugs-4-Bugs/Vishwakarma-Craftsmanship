import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    );
}

export default function ContactPage() {
    const address = "Geeta Ghat Colony, near Bijli Office, Fazalganj, Sasaram, Bihar — PIN: 821113";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-24 sm:py-32">
                <div className="text-center mb-16">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Get In Touch</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        We'd love to hear from you. Whether you have a question about our products, need a custom piece, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                                <CardDescription>We'll get back to you as soon as possible.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" placeholder="j.doe@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="e.g., Custom furniture inquiry" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Your message here..." rows={6} />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full sm:w-auto">Send Message</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <div className="space-y-8 p-6 bg-secondary rounded-lg h-full">
                            <h3 className="font-headline text-2xl font-semibold">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary text-primary-foreground p-3 rounded-full">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Our Address</h4>
                                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                                            {address}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary text-primary-foreground p-3 rounded-full">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Phone</h4>
                                        <p className="text-sm text-secondary-foreground/80">+91 7250063206</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary text-primary-foreground p-3 rounded-full">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Email</h4>
                                        <p className="text-sm text-secondary-foreground/80">support@vishwakarma.com</p>
                                    </div>
                                </div>
                                 <div className="flex items-start gap-4">
                                    <div className="bg-primary text-primary-foreground p-3 rounded-full">
                                        <WhatsAppIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">WhatsApp</h4>
                                         <a href="https://wa.me/917250063206" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                                            +91 7250063206
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
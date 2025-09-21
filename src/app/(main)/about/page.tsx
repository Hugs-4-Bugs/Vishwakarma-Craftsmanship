import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Phone } from 'lucide-react';

const teamMembers = [
    { name: 'Prabhat Kumar', role: 'Founder', phone: '7250063206', imageId: 'carpenter-1' },
    { name: 'Shree Ram Sharma', role: 'CEO & Owner', phone: '7783893249', imageId: 'carpenter-2' },
    { name: 'Kashinath Sharma', role: 'Managing Director (MD)', phone: '9504259392', imageId: 'carpenter-3' },
    { name: 'Vivek Kumar', role: 'Business Promotion', phone: '9241476926', imageId: 'carpenter-2' },
    { name: 'Nachiketa Sharma', role: 'Business Handling', phone: '9473417355', imageId: 'carpenter-1' },
];

export default function AboutPage() {
    const teamImage = PlaceHolderImages.find(p => p.id === 'about-team');

    return (
        <div className="bg-background">
            <div className="py-24 sm:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">About Vishwakarma Furniture</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                           Established with tradition and modern technology. We are custodians of a craft passed down through generations, reimagined for the modern home.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <div>
                            <h2 className="font-headline text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-muted-foreground mb-4">
                                Blending tradition with innovation, ready-made elegance with custom craftsmanship. We believe in sustainability, quality, and empowering local artisans.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" /><span><strong>Unmatched Quality:</strong> Using only the finest, sustainably sourced wood.</span></li>
                                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" /><span><strong>Artisan Empowerment:</strong> Providing a platform for skilled carpenters to showcase their talent.</span></li>
                                <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" /><span><strong>Customer-Centric:</strong> Ensuring every piece of furniture brings joy and comfort to your home.</span></li>
                            </ul>
                        </div>
                        <div>
                            {teamImage && (
                                <Image
                                    src={teamImage.imageUrl}
                                    alt="Our Team"
                                    width={1200}
                                    height={800}
                                    className="rounded-lg shadow-xl"
                                    data-ai-hint={teamImage.imageHint}
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-headline text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {teamMembers.map(member => {
                                const memberImage = PlaceHolderImages.find(p => p.id === member.imageId);
                                return (
                                    <Card key={member.name} className="text-center">
                                        <CardContent className="p-6">
                                            {memberImage && (
                                                <Image
                                                    src={memberImage.imageUrl}
                                                    alt={member.name}
                                                    width={120}
                                                    height={120}
                                                    className="rounded-full mx-auto mb-4 border-4 border-secondary"
                                                    data-ai-hint={memberImage.imageHint}
                                                />
                                            )}
                                            <h3 className="font-headline text-xl font-semibold">{member.name}</h3>
                                            <p className="text-sm text-accent font-medium">{member.role}</p>
                                            <a href={`tel:${member.phone}`} className="mt-2 inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                                                <Phone className="h-4 w-4 mr-2" />
                                                {member.phone}
                                            </a>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

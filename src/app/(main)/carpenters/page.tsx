import { CarpenterCard } from "@/components/shared/carpenter-card";
import { carpenters } from "@/lib/data";

export default function CarpentersPage() {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-24 sm:py-32">
                <div className="text-center mb-12">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Find a Professional Carpenter</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Book skilled and reliable carpenters for everything from custom furniture to home repairs.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {carpenters.map(carpenter => (
                        <CarpenterCard key={carpenter.id} carpenter={carpenter} />
                    ))}
                    {carpenters.map(carpenter => (
                        <CarpenterCard key={`clone-${carpenter.id}`} carpenter={{...carpenter, id: `clone-${carpenter.id}`}} />
                    ))}
                </div>
            </div>
        </div>
    );
}

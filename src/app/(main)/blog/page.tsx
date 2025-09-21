import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-24 sm:py-32">
                <div className="text-center mb-16">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">From Our Workshop</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Insights, stories, and tips from the world of fine furniture and craftsmanship.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => {
                        const postImage = PlaceHolderImages.find(p => p.id === post.image);
                        return (
                             <Card key={post.id} className="overflow-hidden group">
                                {postImage && (
                                    <div className="overflow-hidden">
                                        <Link href="#">
                                        <Image 
                                            src={postImage.imageUrl}
                                            alt={post.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                            data-ai-hint={postImage.imageHint}
                                        />
                                        </Link>
                                    </div>
                                )}
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                                    <Link href="#">
                                        <h2 className="font-headline text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">{post.title}</h2>
                                    </Link>
                                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                                    <p className="text-xs text-muted-foreground font-semibold uppercase">{post.author}</p>
                                </CardContent>
                             </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

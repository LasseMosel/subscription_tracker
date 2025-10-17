import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Product Manager",
            company: "TechCorp",
            content: "Subscription Tracker saved me over $200/month by helping me identify unused subscriptions. The analytics are incredibly detailed and the interface is so intuitive.",
            rating: 5,
            avatar: "SC"
        },
        {
            name: "Michael Rodriguez",
            role: "Freelance Designer",
            company: "Self-employed",
            content: "As a freelancer, I have subscriptions everywhere. This app keeps me organized and helps me budget better. The mobile app is fantastic too.",
            rating: 5,
            avatar: "MR"
        },
        {
            name: "Emily Johnson",
            role: "Marketing Director",
            company: "StartupXYZ",
            content: "Our team uses the Business plan and it's been a game-changer. We've reduced our subscription costs by 30% while improving our tool usage efficiency.",
            rating: 5,
            avatar: "EJ"
        }
    ];

    return (
        <section className="py-20 bg-muted/30">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">
                        <Quote className="w-4 h-4 mr-2" />
                        Customer Stories
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Loved by thousands of users
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        See how Subscription Tracker is helping people save money and stay organized.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <blockquote className="text-muted-foreground mb-6 italic">
                                "{testimonial.content}"
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="font-semibold text-primary">{testimonial.avatar}</span>
                                </div>
                                <div>
                                    <div className="font-semibold">{testimonial.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {testimonial.role} at {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="flex items-center justify-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">50K+</div>
                            <div className="text-sm text-muted-foreground">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">$2M+</div>
                            <div className="text-sm text-muted-foreground">Saved Annually</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">4.9/5</div>
                            <div className="text-sm text-muted-foreground">User Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

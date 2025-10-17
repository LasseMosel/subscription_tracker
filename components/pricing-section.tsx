import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

export function PricingSection() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started with subscription tracking",
            features: [
                "Track up to 5 subscriptions",
                "Basic renewal notifications",
                "Monthly spending overview",
                "Mobile app access",
                "Data export"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Pro",
            price: "$9",
            period: "month",
            description: "For power users who want advanced features",
            features: [
                "Unlimited subscriptions",
                "Advanced analytics & insights",
                "Usage tracking & optimization",
                "Custom categories & tags",
                "Priority support",
                "API access",
                "Team collaboration"
            ],
            cta: "Start Free Trial",
            popular: true
        },
        {
            name: "Business",
            price: "$29",
            period: "month",
            description: "For teams and organizations",
            features: [
                "Everything in Pro",
                "Team management",
                "Centralized billing",
                "Advanced reporting",
                "Custom integrations",
                "Dedicated support",
                "SLA guarantee"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">
                        <Star className="w-4 h-4 mr-2" />
                        Simple Pricing
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Choose the plan that&apos;s right for you
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Start free and upgrade as you grow. All plans include our core features with no hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`p-8 relative ${plan.popular
                                ? 'border-primary shadow-lg scale-105'
                                : 'hover:shadow-lg transition-shadow'
                                }`}
                        >
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                                    Most Popular
                                </Badge>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/{plan.period}</span>
                                </div>
                                <p className="text-muted-foreground">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <span>{feature.replace("'", "&apos;")}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full ${plan.popular
                                    ? 'bg-primary hover:bg-primary/90'
                                    : 'bg-secondary hover:bg-secondary/80'
                                    }`}
                                size="lg"
                            >
                                {plan.cta}
                            </Button>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        All plans include 30-day money-back guarantee
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Need a custom plan? <a href="#" className="text-primary hover:underline">Contact us</a>
                    </p>
                </div>
            </div>
        </section>
    );
}

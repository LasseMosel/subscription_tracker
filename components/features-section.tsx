import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Bell,
    Calendar,
    DollarSign,
    Eye,
    PieChart,
    Smartphone,
    Zap
} from "lucide-react";

export function FeaturesSection() {
    const features = [
        {
            icon: Bell,
            title: "Smart Notifications",
            description: "Get reminded before renewals, price changes, and unused subscriptions.",
            badge: "Popular"
        },
        {
            icon: Calendar,
            title: "Renewal Calendar",
            description: "Visual calendar view of all upcoming renewals and billing cycles.",
            badge: null
        },
        {
            icon: DollarSign,
            title: "Cost Tracking",
            description: "Monitor monthly and yearly spending across all your subscriptions.",
            badge: null
        },
        {
            icon: PieChart,
            title: "Spending Analytics",
            description: "Detailed insights and trends to help you optimize your subscription portfolio.",
            badge: "Pro"
        },
        {
            icon: Eye,
            title: "Usage Monitoring",
            description: "Track which subscriptions you actually use and identify waste.",
            badge: null
        },
        {
            icon: Smartphone,
            title: "Mobile App",
            description: "Manage your subscriptions on the go with our intuitive mobile app.",
            badge: "Coming Soon"
        }
    ];

    return (
        <section className="py-20 bg-muted/30">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">
                        <Zap className="w-4 h-4 mr-2" />
                        Powerful Features
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Everything you need to manage subscriptions
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        From basic tracking to advanced analytics, we've got all the tools you need to take control of your subscription spending.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                {feature.badge && (
                                    <Badge variant={feature.badge === "Popular" ? "default" : "secondary"} className="text-xs">
                                        {feature.badge}
                                    </Badge>
                                )}
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"

export function SubscriptionOverview() {
    const stats = [
        {
            label: "Total Monthly Cost",
            value: "$247.89",
            change: "+12.5%",
            trend: "up" as const,
            icon: DollarSign,
        },
        {
            label: "Active Subscriptions",
            value: "12",
            change: "+2",
            trend: "up" as const,
            icon: Calendar,
        },
        {
            label: "Yearly Projection",
            value: "$2,974.68",
            change: "-5.2%",
            trend: "down" as const,
            icon: TrendingUp,
        },
        {
            label: "Next Payment",
            value: "3 days",
            change: "Netflix",
            trend: "neutral" as const,
            icon: Calendar,
        },
    ]

    return (
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon
                return (
                    <Card key={stat.label} className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <p className="mt-2 text-2xl lg:text-3xl font-semibold tracking-tight">{stat.value}</p>
                                <div className="mt-2 flex items-center gap-1 text-sm">
                                    {stat.trend === "up" && (
                                        <>
                                            <TrendingUp className="h-4 w-4 text-accent" />
                                            <span className="font-medium text-accent">{stat.change}</span>
                                        </>
                                    )}
                                    {stat.trend === "down" && (
                                        <>
                                            <TrendingDown className="h-4 w-4 text-destructive" />
                                            <span className="font-medium text-destructive">{stat.change}</span>
                                        </>
                                    )}
                                    {stat.trend === "neutral" && <span className="text-muted-foreground">{stat.change}</span>}
                                </div>
                            </div>
                            <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0 ml-3">
                                <Icon className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
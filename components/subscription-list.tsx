import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, TrendingUp } from "lucide-react"

const subscriptions = [
    {
        name: "Netflix",
        category: "Entertainment",
        amount: "$15.99",
        billing: "Monthly",
        nextBilling: "Jan 15, 2025",
        status: "active" as const,
    },
    {
        name: "Spotify",
        category: "Music",
        amount: "$9.99",
        billing: "Monthly",
        nextBilling: "Jan 18, 2025",
        status: "active" as const,
    },
    {
        name: "Adobe Creative Cloud",
        category: "Software",
        amount: "$54.99",
        billing: "Monthly",
        nextBilling: "Jan 22, 2025",
        status: "active" as const,
    },
    {
        name: "GitHub Pro",
        category: "Development",
        amount: "$4.00",
        billing: "Monthly",
        nextBilling: "Jan 25, 2025",
        status: "active" as const,
    },
    {
        name: "Notion",
        category: "Productivity",
        amount: "$8.00",
        billing: "Monthly",
        nextBilling: "Jan 28, 2025",
        status: "active" as const,
    },
    {
        name: "ChatGPT Plus",
        category: "AI",
        amount: "$20.00",
        billing: "Monthly",
        nextBilling: "Feb 1, 2025",
        status: "active" as const,
    },
    {
        name: "Figma Professional",
        category: "Design",
        amount: "$12.00",
        billing: "Monthly",
        nextBilling: "Feb 5, 2025",
        status: "active" as const,
    },
    {
        name: "Vercel Pro",
        category: "Hosting",
        amount: "$20.00",
        billing: "Monthly",
        nextBilling: "Feb 8, 2025",
        status: "active" as const,
    },
]

export function SubscriptionList() {
    return (
        <Card className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">All Subscriptions</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Manage your active subscriptions</p>
                </div>
                <Button variant="outline" size="sm" className="self-start sm:self-auto">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Scan for New
                </Button>
            </div>

            {/* Mobile Card Layout */}
            <div className="block sm:hidden space-y-3">
                {subscriptions.map((sub, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{sub.name}</h4>
                                <p className="text-sm text-muted-foreground">{sub.category}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                                <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                    {sub.status}
                                </Badge>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-muted-foreground">Amount:</span>
                                <p className="font-mono font-semibold">{sub.amount}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Billing:</span>
                                <p className="text-muted-foreground">{sub.billing}</p>
                            </div>
                        </div>
                        <div className="mt-3 text-sm">
                            <span className="text-muted-foreground">Next billing:</span>
                            <p className="text-muted-foreground">{sub.nextBilling}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border text-left text-sm text-muted-foreground">
                            <th className="pb-3 font-medium">Service</th>
                            <th className="pb-3 font-medium">Category</th>
                            <th className="pb-3 font-medium">Amount</th>
                            <th className="pb-3 font-medium">Billing</th>
                            <th className="pb-3 font-medium">Next Billing</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((sub, index) => (
                            <tr key={index} className="border-b border-border last:border-0">
                                <td className="py-4 font-medium">{sub.name}</td>
                                <td className="py-4 text-sm text-muted-foreground">{sub.category}</td>
                                <td className="py-4 font-mono font-semibold">{sub.amount}</td>
                                <td className="py-4 text-sm text-muted-foreground">{sub.billing}</td>
                                <td className="py-4 text-sm text-muted-foreground">{sub.nextBilling}</td>
                                <td className="py-4">
                                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                                        {sub.status}
                                    </Badge>
                                </td>
                                <td className="py-4">
                                    <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

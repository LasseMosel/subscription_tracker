import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

const upcomingPayments = [
    {
        name: "Netflix",
        amount: "$15.99",
        date: "Jan 15, 2025",
        daysUntil: 3,
        status: "upcoming" as const,
    },
    {
        name: "Spotify",
        amount: "$9.99",
        date: "Jan 18, 2025",
        daysUntil: 6,
        status: "upcoming" as const,
    },
    {
        name: "Adobe Creative Cloud",
        amount: "$54.99",
        date: "Jan 22, 2025",
        daysUntil: 10,
        status: "upcoming" as const,
    },
    {
        name: "GitHub Pro",
        amount: "$4.00",
        date: "Jan 25, 2025",
        daysUntil: 13,
        status: "upcoming" as const,
    },
    {
        name: "Notion",
        amount: "$8.00",
        date: "Jan 28, 2025",
        daysUntil: 16,
        status: "upcoming" as const,
    },
]

export function UpcomingPayments() {
    return (
        <Card className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Upcoming Payments</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Next 5 subscription renewals</p>
                </div>
                <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-3 sm:space-y-4">
                {upcomingPayments.map((payment, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border-b border-border pb-3 sm:pb-4 last:border-0 last:pb-0"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{payment.name}</p>
                            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{payment.date}</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 ml-2">
                            <Badge variant="secondary" className="font-mono text-xs">
                                {payment.daysUntil}d
                            </Badge>
                            <p className="min-w-[3rem] sm:min-w-[4rem] text-right font-semibold text-sm sm:text-base">{payment.amount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { month: "Jan", amount: 186 },
    { month: "Feb", amount: 205 },
    { month: "Mar", amount: 237 },
    { month: "Apr", amount: 223 },
    { month: "May", amount: 239 },
    { month: "Jun", amount: 248 },
]

const chartConfig = {
    amount: {
        label: "Spending",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export function SpendingChart() {
    return (
        <Card className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
                <h3 className="text-lg font-semibold">Monthly Spending</h3>
                <p className="mt-1 text-sm text-muted-foreground">Your subscription costs over the last 6 months</p>
            </div>

            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-amount)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs"
                        fontSize={12}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs"
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} fill="url(#fillAmount)" />
                </AreaChart>
            </ChartContainer>
        </Card>
    )
}
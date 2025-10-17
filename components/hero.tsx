import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, CreditCard, Shield } from "lucide-react";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      {/* Main Hero Content */}
      <div className="flex flex-col gap-8 items-center text-center max-w-4xl">
        <div className="flex gap-2 items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Shield className="w-4 h-4" />
          Secure & Private
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Take Control of Your
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Subscriptions</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          Track, manage, and optimize your subscriptions. Never miss a payment or waste money on unused services again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            View Demo
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required • Free forever plan available
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Track Everything</h3>
          <p className="text-muted-foreground">Monitor all your subscriptions in one place with automatic renewal tracking.</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Smart Analytics</h3>
          <p className="text-muted-foreground">Get insights into your spending patterns and identify cost-saving opportunities.</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
          <p className="text-muted-foreground">Your data is encrypted and never shared. Complete privacy guaranteed.</p>
        </Card>
      </div>
    </div>
  );
}

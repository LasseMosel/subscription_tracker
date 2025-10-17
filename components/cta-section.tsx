import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="flex gap-2 items-center justify-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8 w-fit mx-auto">
                    <Shield className="w-4 h-4" />
                    Join 50,000+ users saving money
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Ready to take control of your subscriptions?
                </h2>

                <p className="text-xl md:text-2xl mb-8 opacity-90">
                    Start tracking your subscriptions today and never waste money on unused services again.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100">
                        Get Started Free
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                        View Pricing
                    </Button>
                </div>

                <p className="text-sm mt-6 opacity-75">
                    No credit card required • Free forever plan • 30-day money-back guarantee
                </p>
            </div>
        </section>
    );
}

import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Subscription Tracker</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 w-full">
          <Hero />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <CTASection />
        </div>

        <footer className="w-full border-t bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Subscription Tracker</h3>
                <p className="text-muted-foreground text-sm">
                  Take control of your subscriptions and never waste money on unused services again.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Features</a></li>
                  <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                  <li><a href="#" className="hover:text-foreground">Mobile App</a></li>
                  <li><a href="#" className="hover:text-foreground">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">About</a></li>
                  <li><a href="#" className="hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="hover:text-foreground">Careers</a></li>
                  <li><a href="#" className="hover:text-foreground">Press</a></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                © 2024 Subscription Tracker. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <p className="text-xs text-muted-foreground">
                  Built with{" "}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    className="hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://nextjs.org"
                    target="_blank"
                    className="hover:underline"
                    rel="noreferrer"
                  >
                    Next.js
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { ProblemSection } from "@/components/home/problem-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { AutonomyLevels } from "@/components/home/autonomy-levels";
import { ModulesShowcase } from "@/components/home/modules-showcase";
import { CTASection } from "@/components/home/cta-section";
import { Footer } from "@/components/home/footer";

/**
 * AgencyOS AI — landing page.
 *
 * Each section is a separate component under src/components/landing/.
 * This file only composes them; section-specific copy, motion variants
 * and styling live in their own files so you can lift any one out
 * without dragging the others along.
 *
 * Layout:
 *   <Header /> (fixed)
 *   <main> ... all sections ... </main>
 *   <Footer /> (mt-auto sticks it to the bottom on short pages)
 *
 * The outer wrapper uses min-h-screen + flex-col so the sticky-footer
 * rule from the design system holds.
 */
export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <AutonomyLevels />
        <ModulesShowcase />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
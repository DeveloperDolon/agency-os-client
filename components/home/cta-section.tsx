"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  scaleIn,
} from "@/lib/motion";

/**
 * Final call-to-action. The card has a layered gradient wash built
 * from the user's primary + running tokens, plus a soft dotted
 * backdrop so it reads as a distinct "landing zone" rather than
 * another content row.
 */
export function CTASection() {
  return (
    <section id="cta" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-16"
        >
          {/* layered wash */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-running/15" />
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-running/20 blur-3xl" />
            <div className="absolute inset-0 bg-dots opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
          </div>

          <motion.span
            variants={scaleIn}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.7, 0.2, 0.7],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute inline-flex h-full w-full rounded-full bg-success"
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Private alpha · accepting a small first cohort
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Stop switching tabs. Start{" "}
            <span className="bg-gradient-to-r from-primary to-running bg-clip-text text-transparent">
              deciding with evidence.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            AgencyOS AI runs locally first, drafts against your own knowledge
            base, and never acts without an approval you can audit. Get on the
            list and we&apos;ll send the blueprint + an invite when your slot opens.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90"
            >
              <Link href="mailto:hello@agencyos.ai">
                <Mail className="mr-2 h-4 w-4" />
                Request access
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-background/60 px-6 text-foreground backdrop-blur hover:bg-accent"
            >
              <Link href="#top">
                Read the blueprint
              </Link>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground"
          >
            <GitBranch className="h-3.5 w-3.5" />
            Local-first until milestone 5 · no free tier with real client data
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

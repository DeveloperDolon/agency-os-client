"use client";

import { motion } from "framer-motion";
import { Bot, ShieldCheck, Database } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  scaleIn,
} from "@/lib/motion";

/**
 * How it works — three steps, drawn from the blueprint's core
 * operating principle: "software owns the business rules, AI
 * prepares and recommends, you decide."
 *
 *   1. AI prepares   — single-step LLM call or workflow
 *   2. You approve   — approval bound to the exact payload hash
 *   3. Action recorded — durable agent_run + tool_invocation row
 *
 * A connecting line animates left-to-right between the steps on
 * `lg`+ to reinforce the sequence.
 */
const STEPS = [
  {
    icon: Bot,
    eyebrow: "Step 01",
    title: "AI prepares",
    body: "A workflow — or, when the path genuinely forks, a single agent — fills in one step at a time. It only sees tools that are explicitly registered, never credentials or shell access.",
    tone: "primary" as const,
    meta: ["model + prompt versioned", "Pydantic schemas in/out", "level ≤ 2 by default"],
  },
  {
    icon: ShieldCheck,
    eyebrow: "Step 02",
    title: "You approve",
    body: "Every consequential action is bound to an approval whose hash matches the exact payload and version. Single-use, expiring, and any material change invalidates it.",
    tone: "success" as const,
    meta: ["payload hash matched", "single-use + expiring", "who / when recorded"],
  },
  {
    icon: Database,
    eyebrow: "Step 03",
    title: "Action recorded",
    body: "The tool runs with a scoped credential the model never sees. The outcome — including denials — is written to the same agent_runs + tool_invocations row, forever.",
    tone: "running" as const,
    meta: ["idempotency key", "denials logged too", "database is the source of truth"],
  },
];

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  running: "bg-running/10 text-running",
};

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 border-y border-border bg-surface/40 py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={scaleIn}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-running" />
            How it works
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Software owns the rules.{" "}
            <span className="text-running">AI prepares and recommends.</span>{" "}
            You decide.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg"
          >
            Three movements, repeated all day. The AI is never the last step —
            an approval and a durable record always are.
          </motion.p>
        </motion.div>

        {/* Steps + connecting line */}
        <div className="relative mt-16">
          {/* horizontal connecting line, lg+ only */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-primary via-success to-running lg:block"
          />

          <motion.div
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {STEPS.map((step, i) => (
              <motion.article
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col"
              >
                {/* node on the line */}
                <div className="relative mb-6 flex items-center gap-4">
                  <div
                    className={cn(
                      "relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface shadow-sm",
                      toneClasses[step.tone]
                    )}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {step.eyebrow}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {step.meta.map((m) => (
                    <li
                      key={m}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          toneClasses[step.tone].split(" ")[0]
                        )}
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

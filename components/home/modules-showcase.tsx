"use client";

import { motion } from "framer-motion";
import {
  MessageSquareText,
  Sunrise,
  FileText,
  Workflow,
  Cpu,
  Database,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  scaleIn,
} from "@/lib/motion";

/**
 * Agents section — the three roles the blueprint explicitly ships:
 *   1. Communication drafter   (workflow, 1 model call, ceiling L2)
 *   2. Briefing assistant       (job + 1 model call over queried data, ceiling L4 read-only)
 *   3. Proposal drafter         (workflow, several steps, ceiling L2)
 *
 * Plus a compact "tool gateway" pipeline (the 7-step sequence every
 * tool call goes through, human or agent).
 */

type Agent = {
  icon: LucideIcon;
  name: string;
  form: string;
  purpose: string;
  ceiling: number;
  ceilingLabel: string;
  maxRun: string;
  retries: string;
  escalate: string;
  tone: "primary" | "running" | "pending";
};

const AGENTS: Agent[] = [
  {
    icon: MessageSquareText,
    name: "Communication drafter",
    form: "Workflow · 1 model call",
    purpose:
      "Classify intent, spot missing information, surface risks, draft a reply bound to your pricing rules.",
    ceiling: 2,
    ceilingLabel: "Draft only",
    maxRun: "60s",
    retries: "2 (on invalid output)",
    escalate: "Risk flag, low confidence, or commitment detected",
    tone: "primary",
  },
  {
    icon: Sunrise,
    name: "Briefing assistant",
    form: "Job · 1 model call over queried data",
    purpose:
      "Every morning: a summary of unanswered conversations, due follow-ups, and pending approvals.",
    ceiling: 4,
    ceilingLabel: "Read-only",
    maxRun: "120s",
    retries: "1",
    escalate: "Any claim it cannot source back to a record",
    tone: "running",
  },
  {
    icon: FileText,
    name: "Proposal drafter",
    form: "Workflow · several steps",
    purpose:
      "Requirements → approach → estimate with assumptions, risks, and client questions, ready for your review.",
    ceiling: 2,
    ceilingLabel: "Draft only",
    maxRun: "180s",
    retries: "2",
    escalate: "Any price, date, credential, or case study not in the knowledge base",
    tone: "pending",
  },
];

const GATEWAY_STEPS = [
  { label: "Authenticate caller", icon: ShieldCheck },
  { label: "Resolve workspace", icon: Database },
  { label: "Look up tool level + scopes", icon: Workflow },
  { label: "Run policy check", icon: ShieldCheck },
  { label: "Validate args against schema", icon: Cpu },
  { label: "Verify unexpired approval (L3)", icon: ShieldCheck },
  { label: "Execute + record invocation", icon: Database },
];

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  running: "bg-running/10 text-running",
  pending: "bg-pending-bg text-pending",
};

export function ModulesShowcase() {
  return (
    <section
      id="agents"
      className="relative scroll-mt-24 border-t border-border bg-surface/40 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <motion.span
            variants={scaleIn}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <Cpu className="h-3 w-3 text-primary" />
            Agent architecture
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Three roles ship first.{" "}
            <span className="text-primary">
              Most of what you call agents should be workflows.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg"
          >
            A fixed workflow is cheaper, testable, and easier to keep inside its
            permissions. An LLM-driven agent is reserved for the rare path that
            genuinely depends on what the previous step found.
          </motion.p>
        </motion.div>

        {/* agent cards */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {AGENTS.map((a) => (
            <motion.article
              key={a.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-xl hover:shadow-foreground/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    toneClasses[a.tone]
                  )}
                >
                  <a.icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    a.ceiling === 4
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-primary/30 bg-primary/10 text-primary"
                  )}
                >
                  L{a.ceiling} · {a.ceilingLabel}
                </span>
              </div>

              <h3 className="mt-5 text-base font-semibold text-foreground">
                {a.name}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {a.form}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {a.purpose}
              </p>

              <dl className="mt-5 space-y-2 border-t border-border pt-4 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Max run</dt>
                  <dd className="font-medium text-foreground">{a.maxRun}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Retries</dt>
                  <dd className="font-medium text-foreground">{a.retries}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">Escalate when</dt>
                  <dd className="font-medium text-foreground">{a.escalate}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </motion.div>

        {/* tool gateway */}
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 rounded-2xl border border-border bg-background/60 p-6 sm:p-8"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Tool &amp; integration gateway
              </h3>
              <p className="text-sm text-muted-foreground">
                Tools are plain Python functions registered in one module.
                Every call — agent or human click — goes through the same
                sequence and is recorded.
              </p>
            </div>
          </motion.div>

          <motion.ol
            variants={staggerContainer(0.07, 0.1)}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
          >
            {GATEWAY_STEPS.map((step, i) => (
              <motion.li
                key={step.label}
                variants={fadeUp}
                className="group relative flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <step.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs leading-snug text-foreground">
                  {step.label}
                </span>
              </motion.li>
            ))}
          </motion.ol>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-xs text-muted-foreground"
          >
            <span className="font-semibold text-foreground">Key invariant:</span>{" "}
            agents receive tool names and schemas — never credentials, database
            connections, or shell access. A tool that is not registered does not
            exist for the agent.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

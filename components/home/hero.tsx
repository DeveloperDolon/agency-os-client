"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Inbox,
  ListChecks,
  Sunrise,
  Bot,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  viewportOnce,
  floatLoop,
  pulseDot,
} from "@/lib/motion";

/**
 * Hero section.
 *
 * Two-column layout on `lg`+:
 *   left  = headline, subhead, primary + secondary CTAs, trust row
 *   right = animated "dashboard" mockup with floating live cards
 *
 * The mockup is pure markup + framer motion (no images), so it
 * stays crisp at any resolution and inherits the user's color tokens.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 glow-primary blur-3xl opacity-60" />
        <div className="absolute right-[-10%] top-1/3 h-[280px] w-[280px] rounded-full bg-running/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* ---- Left column ---- */}
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6"
        >
          <motion.div variants={scaleIn}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  variants={pulseDot}
                  className="absolute inline-flex h-full w-full rounded-full bg-success"
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              v2 strategic blueprint · now in private alpha
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Software owns the rules.
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-running bg-clip-text text-transparent">
              AI prepares and recommends.
            </span>
            <br />
            You decide.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            AgencyOS AI is a policy-governed operating system for a one-person
            agency. It drafts your replies, surfaces the follow-ups you forgot,
            briefs you every morning — and records every AI run so nothing
            happens silently.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90"
            >
              <Link href="#cta">
                Request access
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-surface/60 px-6 text-foreground backdrop-blur hover:bg-accent"
            >
              <Link href="#how-it-works">
                See how it works
              </Link>
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
          >
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              Every action approval-bound
            </li>
            <li className="inline-flex items-center gap-2">
              <Activity className="h-4 w-4 text-running" />
              Full agent-run audit trail
            </li>
            <li className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Local-first by default
            </li>
          </motion.ul>
        </motion.div>

        {/* ---- Right column: dashboard mockup ---- */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="relative lg:col-span-6"
        >
          <HeroDashboard />
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/* Animated dashboard mockup                                       */
/* -------------------------------------------------------------- */

function HeroDashboard() {
  return (
    <motion.div
      variants={floatLoop(8, -10)}
      className="relative mx-auto w-full max-w-[560px]"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8, rotateY: -4 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-2xl shadow-foreground/10 backdrop-blur-xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border bg-background/40 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-danger/80" />
            <span className="h-3 w-3 rounded-full bg-pending/80" />
            <span className="h-3 w-3 rounded-full bg-success/80" />
          </div>
          <div className="text-xs font-medium text-muted-foreground">
            agencyos · daily briefing
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                variants={pulseDot}
                className="absolute inline-flex h-full w-full rounded-full bg-running"
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-running" />
            </span>
            live
          </div>
        </div>

        {/* Body */}
        <div className="space-y-3 p-5">
          {/* Morning briefing header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sunrise className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                Morning briefing · Nov 2
              </p>
              <p className="text-xs text-muted-foreground">
                4 unanswered · 2 follow-ups due · 1 pending approval
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              level 4
            </span>
          </motion.div>

          {/* Row: inbox + follow-ups */}
          <div className="grid grid-cols-2 gap-3">
            <MiniStat
              icon={Inbox}
              label="Unanswered"
              value="4"
              tone="running"
              delay={0.55}
            />
            <MiniStat
              icon={ListChecks}
              label="Due today"
              value="2"
              tone="pending"
              delay={0.62}
            />
          </div>

          {/* AI-drafted reply preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="rounded-xl border border-border bg-background/60 p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  Draft reply · Upwork
                </span>
              </div>
              <span className="rounded-full bg-pending-bg px-2 py-0.5 text-[10px] font-medium text-pending">
                level 2 · draft
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              “Hi Maya — thanks for sharing the brief. Two quick questions
              before I scope this: do you need the dashboard live by Dec 1, and
              is the $4.5k figure a hard ceiling?”
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button className="inline-flex h-7 items-center rounded-md bg-primary px-3 text-[11px] font-medium text-primary-foreground">
                Approve &amp; copy
              </button>
              <button className="inline-flex h-7 items-center rounded-md border border-border px-3 text-[11px] font-medium text-muted-foreground hover:text-foreground">
                Edit
              </button>
            </div>
          </motion.div>

          {/* Agent run row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2.5"
          >
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-running" />
              <span className="text-xs text-muted-foreground">
                agent_run · 2026-11-02T08:14:02Z
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              <span className="text-[11px] font-medium text-success">
                recorded
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating approval chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-3 top-6 hidden sm:block"
      >
        <motion.div variants={floatLoop(5, -8)}>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/95 px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-success" />
            <div className="text-[11px] leading-tight">
              <p className="font-semibold text-foreground">Approval bound</p>
              <p className="text-muted-foreground">payload hash matched</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating cost chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-4 bottom-10 hidden sm:block"
      >
        <motion.div variants={floatLoop(6.5, 8)}>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/95 px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur">
            <Clock className="h-4 w-4 text-running" />
            <div className="text-[11px] leading-tight">
              <p className="font-semibold text-foreground">1,284 tokens</p>
              <p className="text-muted-foreground">~$0.0042 / run</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating alert chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-2 bottom-24 hidden lg:block"
      >
        <motion.div variants={floatLoop(7, -6)}>
          <div className="flex items-center gap-2 rounded-xl border border-pending/30 bg-pending-bg/80 px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur">
            <AlertTriangle className="h-4 w-4 text-pending" />
            <div className="text-[11px] leading-tight">
              <p className="font-semibold text-pending">Commitment flag</p>
              <p className="text-muted/90">price ceiling reached</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  tone,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "running" | "pending" | "success";
  delay: number;
}) {
  const toneClasses: Record<typeof tone, string> = {
    running: "bg-running/10 text-running",
    pending: "bg-pending-bg text-pending",
    success: "bg-success/10 text-success",
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3"
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          toneClasses[tone]
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-lg font-semibold leading-none text-foreground">
          {value}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

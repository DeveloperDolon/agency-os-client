import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * AgencyOS AI logo mark.
 *
 * Pure SVG so it inherits `currentColor` and scales crisply.
 * The mark is a stylized "A" formed by a wedge + a horizontal
 * approval bar — a nod to the "AI prepares, you approve" model.
 */
export function AgencyOsLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AgencyOS AI logo"
      className={cn("text-primary", className)}
    >
      <defs>
        <linearGradient
          id="agencyos-logo-grad"
          x1="4"
          y1="4"
          x2="36"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--running)" />
        </linearGradient>
      </defs>

      {/* Rounded square backdrop */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="10"
        fill="url(#agencyos-logo-grad)"
        opacity="0.12"
      />
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="10"
        stroke="url(#agencyos-logo-grad)"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* "A" wedge */}
      <path
        d="M20 8.5L30.5 30H25.2L23 24.5H17L14.8 30H9.5L20 8.5Z"
        fill="url(#agencyos-logo-grad)"
      />
      {/* crossbar of the A — the "approval bar" */}
      <path
        d="M17.6 20.5H22.4L20 14.8L17.6 20.5Z"
        fill="var(--background)"
      />
    </svg>
  );
}

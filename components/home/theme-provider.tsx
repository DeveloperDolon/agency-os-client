"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Thin wrapper around next-themes so the rest of the app can
 * import a single, already-configured provider.
 *
 * Configured in `layout.tsx` with:
 *   attribute="class"         -> toggles the `.dark` class on <html>
 *   defaultTheme="dark"       -> AgencyOS ships dark by default
 *   enableSystem              -> still respects OS preference when user picks "system"
 *   disableTransitionOnChange -> avoids the color flash on theme switch
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

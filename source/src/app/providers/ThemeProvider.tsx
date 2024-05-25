"use client";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";

interface Props {
  children: ReactNode;
}

function ThemeProviders({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default ThemeProviders;

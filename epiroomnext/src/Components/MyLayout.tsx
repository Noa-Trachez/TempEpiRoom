"use client";
import { NextUIProvider } from "@nextui-org/react";
import RouteGuards from "@/Components/RouteGuards";

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <RouteGuards>{children}</RouteGuards>
    </NextUIProvider>
  );
}

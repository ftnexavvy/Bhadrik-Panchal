"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ConditionalFooter from "@/components/ConditionalFooter";
import { ReactNode } from "react";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
  loading: () => null,
});

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <ScrollProgress />
        <Navbar />
        {children}
        <ConditionalFooter />
      </SmoothScroll>
    </>
  );
}

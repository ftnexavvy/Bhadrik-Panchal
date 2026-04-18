"use client";

import dynamic from "next/dynamic";
import { ReactNode, useState, useEffect } from "react";
import GlobalErrorHandler from "@/components/GlobalErrorHandler";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
  loading: () => null,
});

const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), {
  ssr: false,
  loading: () => null,
});

export default function ClientShell({ children }: { children: ReactNode }) {
  // Start false on both server and client to avoid hydration mismatch.
  // After hydration, detect if this is a non-touch (desktop) device.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDesktop(!window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <>
      <GlobalErrorHandler />
      {isDesktop && <CustomCursor />}
      <SmoothScroll>
        {isDesktop && <ScrollProgress />}
        <Navbar />
        {children}
        <ConditionalFooter />
      </SmoothScroll>
    </>
  );
}

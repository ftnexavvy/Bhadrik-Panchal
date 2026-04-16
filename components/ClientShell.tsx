"use client";

import { ReactNode, useState, useEffect } from "react";
import GlobalErrorHandler from "@/components/GlobalErrorHandler";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";

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

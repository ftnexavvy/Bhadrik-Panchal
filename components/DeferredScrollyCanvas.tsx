"use client";

import dynamic from "next/dynamic";
import { useDeferredRender } from "./useDeferredRender";

const ScrollyCanvas = dynamic(() => import("./ScrollyCanvas"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />,
});

export default function DeferredScrollyCanvas(props: { frameCount: number; children?: React.ReactNode }) {
  const ready = useDeferredRender(120);
  if (!ready) return <div className="min-h-screen bg-black" aria-hidden />;
  return <ScrollyCanvas {...props} />;
}

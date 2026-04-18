"use client";

import { useEffect, useState } from "react";
import { useDeferredRender } from "./useDeferredRender";

interface DeferredScrollyCanvasProps {
  frameCount: number;
  children?: React.ReactNode;
}

const POSTER_SRC = "/sequence/frame_00_poster-640.webp";
const POSTER_SRCSET_WEBP = "/sequence/frame_00_poster-400.webp 400w, /sequence/frame_00_poster-640.webp 640w";

function ScrollyCanvasFallback({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full bg-black min-h-screen">
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none -mb-[100vh]">
        <picture className="absolute inset-0 block h-full w-full">
          <source srcSet={POSTER_SRCSET_WEBP} sizes="100vw" type="image/webp" />
          <img
            src={POSTER_SRC}
            alt="Hero poster"
            width={640}
            height={360}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        <div
          className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-screen"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: "200px 200px",
          }}
        />
        <div className="absolute inset-0 z-10 bg-black/45 pointer-events-none" />
      </div>

      <div className="relative z-20 w-full min-h-screen">{children}</div>
    </div>
  );
}

export default function DeferredScrollyCanvas({
  frameCount,
  children,
}: DeferredScrollyCanvasProps) {
  const ready = useDeferredRender(120);
  const [ScrollyCanvas, setScrollyCanvas] =
    useState<null | ((props: DeferredScrollyCanvasProps) => React.ReactNode)>(null);

  useEffect(() => {
    if (!ready) return;

    let active = true;

    void import("./ScrollyCanvas").then((module) => {
      if (!active) return;
      setScrollyCanvas(() => module.default);
    });

    return () => {
      active = false;
    };
  }, [ready]);

  if (!ready || !ScrollyCanvas) {
    return <ScrollyCanvasFallback>{children}</ScrollyCanvasFallback>;
  }

  return <ScrollyCanvas frameCount={frameCount}>{children}</ScrollyCanvas>;
}

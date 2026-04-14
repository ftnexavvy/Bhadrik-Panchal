"use client";

import { useEffect, useState } from "react";

export function useDeferredRender(timeout = 150) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const schedule =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback
        : (cb: () => void, opts?: { timeout: number }) => setTimeout(cb, opts?.timeout ?? timeout);
    const cancel =
      typeof cancelIdleCallback !== "undefined"
        ? cancelIdleCallback
        : (id: number) => clearTimeout(id);

    const id = schedule(() => setReady(true), { timeout });
    return () => cancel(id as number);
  }, [timeout]);

  return ready;
}

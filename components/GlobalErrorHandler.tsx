"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __bhadrikGlobalErrorHandlerInstalled__?: boolean;
  }
}

export default function GlobalErrorHandler() {
  useEffect(() => {
    if (window.__bhadrikGlobalErrorHandlerInstalled__) return;
    window.__bhadrikGlobalErrorHandlerInstalled__ = true;

    const handleError = (event: ErrorEvent) => {
      if (typeof event.message === "string" && event.message.includes("ResizeObserver loop")) {
        event.preventDefault();
        return;
      }

      console.error("[GlobalError]", {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason =
        event.reason instanceof Error
          ? { message: event.reason.message, stack: event.reason.stack }
          : event.reason;

      console.error("[UnhandledRejection]", reason);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.__bhadrikGlobalErrorHandlerInstalled__ = false;
    };
  }, []);

  return null;
}

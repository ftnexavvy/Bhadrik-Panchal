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

    const handleError = (event: ErrorEvent | Event) => {
      if (event instanceof ErrorEvent) {
        if (typeof event.message === "string" && event.message.includes("ResizeObserver loop")) {
          event.preventDefault();
          return;
        }

        // eslint-disable-next-line no-console
        window.console.warn("[GlobalError]", {
          message: event.message || "Script error or cross-origin issue",
          source: event.filename || "unknown",
          line: event.lineno || 0,
          column: event.colno || 0,
          error: event.error,
        });
      } else {
        // eslint-disable-next-line no-console
        window.console.warn("[ResourceError]", {
          target: event.target,
          type: event.type,
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason =
        event.reason instanceof Error
          ? { message: event.reason.message, stack: event.reason.stack }
          : event.reason;

      // eslint-disable-next-line no-console
      window.console.warn("[UnhandledRejection]", reason);
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

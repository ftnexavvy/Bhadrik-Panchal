"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { trackEvent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    trackEvent("page_view", {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!GA_ID) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const trackedElement = target.closest<HTMLElement>("[data-track-event]");
      if (trackedElement) {
        const eventName = trackedElement.dataset.trackEvent;
        if (!eventName) return;

        trackEvent(eventName, {
          event_category: trackedElement.dataset.trackCategory ?? "engagement",
          event_label:
            trackedElement.dataset.trackLabel ??
            trackedElement.textContent?.trim().slice(0, 80) ??
            "cta",
        });
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      try {
        const url = new URL(anchor.href, window.location.origin);
        if (url.origin === window.location.origin) return;

        trackEvent("outbound_click", {
          event_category: "outbound",
          event_label: url.href,
          link_domain: url.hostname,
        });
      } catch {
        // ignore invalid urls
      }
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}

import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://www.bhadrikpanchal.com";

const sanitizeBaseUrl = (url: string) => url.replace(/\/$/, "");

export const SITE_URL = sanitizeBaseUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || FALLBACK_SITE_URL,
);

export const SITE_NAME = "Bhadrik Panchal";
export const SITE_SHORT_NAME = "Bhadrik Panchal";
export const DEFAULT_LOCALE = "en_IN";
export const OG_IMAGE = "/images/cases/favicon-bhadrik-panchal.webp";

export const DEFAULT_KEYWORDS = [
  "business coach in Ahmedabad",
  "motivational speaker in Gujarat",
  "business growth mentor",
  "founder coaching",
  "scaling systems",
  "leadership coaching",
  "Bhadrik Panchal",
];

export type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

const normalizePath = (path = "/") => {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
};

export const absoluteUrl = (path = "/") => {
  return new URL(normalizePath(path), `${SITE_URL}/`).toString();
};

export const buildPageMetadata = ({
  title,
  description,
  path = "/",
  keywords,
}: PageMetadataInput): Metadata => {
  const canonical = absoluteUrl(path);
  const mergedKeywords = keywords?.length ? keywords : DEFAULT_KEYWORDS;

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: "website",
      images: [
        {
          url: absoluteUrl(OG_IMAGE),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Business Growth Coach`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(OG_IMAGE)],
    },
  };
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Bhadrik Panchal",
  url: SITE_URL,
  image: absoluteUrl(OG_IMAGE),
  jobTitle: "Business Growth Coach",
  description:
    "Business growth coach and motivational speaker helping entrepreneurs build clarity, systems, and scalable growth.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/bhadrikpanchal/",
    "https://www.linkedin.com/in/panchalbhadrik/",
    "https://x.com/panchalbhadrik",
    "https://www.youtube.com/@bhadrikpanchal",
    "https://facebook.com/panchalbhadrik",
  ],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Bhadrik Panchal Coaching",
  url: SITE_URL,
  logo: absoluteUrl(OG_IMAGE),
  description:
    "Business coaching and strategic mentorship for founders and growth-stage entrepreneurs.",
  founder: {
    "@id": `${SITE_URL}/#person`,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@bhadrikpanchal.com",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@bhadrikpanchal.com",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#local-business`,
  name: "Bhadrik Panchal - Business Coach Ahmedabad",
  url: SITE_URL,
  image: absoluteUrl(OG_IMAGE),
  priceRange: "$$$",

  areaServed: {
    "@type": "Country",
    name: "India",
  },

  email: "hello@bhadrikpanchal.com",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380001",
    addressCountry: "IN",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.0225,
    longitude: 72.5714,
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  ],

  founder: {
    "@id": `${SITE_URL}/#person`,
  },

  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Business Coaching",
      description:
        "Business growth coaching, systems development, and scaling strategy for founders.",
    },
  },

  sameAs: [
    "https://maps.app.goo.gl/9yxjdLKcRqmfL76T9",
    "https://www.instagram.com/bhadrikpanchal/",
    "https://www.linkedin.com/in/panchalbhadrik/",
  ],
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

export const globalSchemas = [
  personSchema,
  organizationSchema,
  localBusinessSchema,
  breadcrumbSchema,
];

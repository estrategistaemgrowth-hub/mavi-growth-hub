import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  schemaMarkup?: object;
}

const BASE_URL = "https://www.agenciamavi.com.br";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  schemaMarkup,
}: SEOProps) {
  const fullTitle = `${title} | MAVI Marketing Digital`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="MAVI Marketing Digital" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {canonicalUrl && <meta name="twitter:url" content={canonicalUrl} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.agenciamavi.com.br${item.url}`,
    })),
  };
}

// FAQ Schema Generator
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

// Service Schema Generator
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "MarketingAgency",
      "name": "MAVI Marketing Digital",
      "url": "https://www.agenciamavi.com.br",
    },
    "name": service.name,
    "description": service.description,
    "url": `https://www.agenciamavi.com.br${service.url}`,
    "areaServed": {
      "@type": "Country",
      "name": "Brasil",
    },
  };
}

// LocalBusiness Schema Generator (for local SEO)
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "MAVI Marketing Digital",
    "image": "https://www.agenciamavi.com.br/og-image.png",
    "url": "https://www.agenciamavi.com.br",
    "telephone": "+55-47-3307-2030",
    "email": "agenciamavi@agenciamavi.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jaraguá do Sul",
      "addressLocality": "Jaraguá do Sul",
      "addressRegion": "SC",
      "postalCode": "89250-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -26.4853,
      "longitude": -49.0689
    },
    "sameAs": [
      "https://www.instagram.com/agenciamavi",
      "https://www.facebook.com/agenciamavi"
    ],
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ]
  };
}

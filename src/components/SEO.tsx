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
    "legalName": "MAVI Marketing Digital LTDA",
    "image": "https://www.agenciamavi.com.br/og-image.png",
    "logo": "https://www.agenciamavi.com.br/og-image.png",
    "url": "https://www.agenciamavi.com.br",
    "telephone": "+55-47-3307-2030",
    "email": "agenciamavi@agenciamavi.com.br",
    "description": "Agência de marketing digital especializada em e-commerce, performance, automação e CRM. Atendemos empresas de todo o Brasil com foco em resultados mensuráveis.",
    "foundingDate": "2020",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Expedicionário Holz, 550 - Sala 301",
      "addressLocality": "Jaraguá do Sul",
      "addressRegion": "SC",
      "postalCode": "89251-400",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -26.4853,
      "longitude": -49.0689
    },
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -26.4853,
        "longitude": -49.0689
      },
      "geoRadius": "5000 km"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Marketing Digital",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce",
            "url": "https://www.agenciamavi.com.br/servicos/ecommerce"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing de Performance",
            "url": "https://www.agenciamavi.com.br/servicos/performance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM HUBRS",
            "url": "https://www.agenciamavi.com.br/hubrs-crm"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automação e IA",
            "url": "https://www.agenciamavi.com.br/servicos/automacao"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Micro SaaS",
            "url": "https://www.agenciamavi.com.br/servicos/micro-saas"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/agenciamavi",
      "https://www.facebook.com/agenciamavi",
      "https://www.linkedin.com/company/agenciamavi"
    ],
    "priceRange": "$$",
    "currenciesAccepted": "BRL",
    "paymentAccepted": "Pix, Transferência Bancária, Boleto, Cartão de Crédito",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-47-3307-2030",
      "contactType": "sales",
      "email": "agenciamavi@agenciamavi.com.br",
      "availableLanguage": ["Portuguese"]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "knowsAbout": [
      "Marketing Digital",
      "E-commerce",
      "Marketing de Performance",
      "Google Ads",
      "Meta Ads",
      "Gestão de Redes Sociais",
      "Automação de Marketing",
      "Inteligência Artificial aplicada a Marketing",
      "CRM",
      "Marketplace",
      "Mercado Livre",
      "Tray E-commerce",
      "Micro SaaS"
    ],
    "knowsLanguage": "pt-BR",
    "slogan": "Estratégias de vendas que impulsionam negócios a novos patamares"
  };
}

// Organization Schema for GEO (Generative Engine Optimization)
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MAVI Marketing Digital",
    "url": "https://www.agenciamavi.com.br",
    "logo": "https://www.agenciamavi.com.br/og-image.png",
    "description": "Agência de marketing digital especializada em e-commerce, performance, automação com IA e CRM. Atendemos empresas de todo o Brasil com foco em resultados mensuráveis.",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "MAVI Marketing Digital"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-47-3307-2030",
      "contactType": "sales",
      "email": "agenciamavi@agenciamavi.com.br",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.instagram.com/agenciamavi",
      "https://www.facebook.com/agenciamavi",
      "https://www.linkedin.com/company/agenciamavi"
    ],
    "knowsAbout": [
      "Marketing Digital",
      "E-commerce",
      "Marketing de Performance",
      "Automação de Marketing",
      "CRM",
      "Inteligência Artificial"
    ]
  };
}

// WebSite Schema with SearchAction for GEO
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MAVI Marketing Digital",
    "url": "https://www.agenciamavi.com.br",
    "description": "Agência de marketing digital especializada em e-commerce, performance, automação e CRM em Jaraguá do Sul, SC.",
    "publisher": {
      "@type": "Organization",
      "name": "MAVI Marketing Digital"
    },
    "inLanguage": "pt-BR"
  };
}

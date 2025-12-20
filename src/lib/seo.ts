import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const APP_NAME = 'AGM Store Builder';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://shopwithagm.com';
const DEFAULT_IMAGE = '/og-image.png';
const TWITTER_HANDLE = '@agmstorebuilder';

/**
 * Generate SEO-optimized metadata for Next.js pages
 * 
 * @example
 * ```tsx
 * // In page.tsx or layout.tsx
 * export const metadata = generateMetadata({
 *   title: 'Dashboard',
 *   description: 'Manage your online store',
 *   image: '/dashboard-preview.png',
 * });
 * ```
 */
export function generateMetadata({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noIndex = false,
  keywords,
  author,
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const fullTitle = `${title} | ${APP_NAME}`;
  const fullUrl = url ? `${APP_URL}${url}` : APP_URL;
  const fullImage = image.startsWith('http') ? image : `${APP_URL}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: APP_NAME,
    publisher: APP_NAME,

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: APP_NAME,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_NG',
      type: type === 'product' ? 'website' : type, // 'product' not supported, use 'website'
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },

    // Robots
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    // Other metadata
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Generate JSON-LD structured data
 * 
 * @example
 * ```tsx
 * const jsonLd = generateJSONLD({
 *   '@type': 'Organization',
 *   name: 'AGM Store Builder',
 *   url: 'https://shopwithagm.com',
 *   logo: 'https://shopwithagm.com/logo.png',
 * });
 * 
 * // In your component
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: jsonLd }}
 * />
 * ```
 */
export function generateJSONLD(data: Record<string, any>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  });
}

/**
 * Generate Organization JSON-LD
 */
export function generateOrganizationJSONLD() {
  return generateJSONLD({
    '@type': 'Organization',
    name: APP_NAME,
    url: APP_URL,
    logo: `${APP_URL}/logo.png`,
    description: 'Build professional online stores in Nigeria',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-800-123-4567',
      contactType: 'customer service',
      areaServed: 'NG',
      availableLanguage: ['en'],
    },
    sameAs: [
      'https://facebook.com/agmstorebuilder',
      'https://twitter.com/agmstorebuilder',
      'https://instagram.com/agmstorebuilder',
    ],
  });
}

/**
 * Generate Product JSON-LD
 */
export function generateProductJSONLD(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
}) {
  return generateJSONLD({
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'NGN',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
    },
    brand: product.brand
      ? {
          '@type': 'Brand',
          name: product.brand,
        }
      : undefined,
    sku: product.sku,
  });
}

/**
 * Generate Breadcrumb JSON-LD
 */
export function generateBreadcrumbJSONLD(
  items: Array<{ name: string; url: string }>
) {
  return generateJSONLD({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${APP_URL}${item.url}`,
    })),
  });
}

/**
 * Generate LocalBusiness JSON-LD (for store pages)
 */
export function generateLocalBusinessJSONLD(store: {
  name: string;
  description: string;
  image?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  phone?: string;
  email?: string;
}) {
  return generateJSONLD({
    '@type': 'LocalBusiness',
    name: store.name,
    description: store.description,
    image: store.image,
    address: store.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: store.address.street,
          addressLocality: store.address.city,
          addressRegion: store.address.state,
          addressCountry: store.address.country,
        }
      : undefined,
    telephone: store.phone,
    email: store.email,
  });
}

/**
 * Generate FAQ JSON-LD
 */
export function generateFAQJSONLD(
  faqs: Array<{ question: string; answer: string }>
) {
  return generateJSONLD({
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
}

/**
 * Generate Article JSON-LD (for blog posts)
 */
export function generateArticleJSONLD(article: {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
}) {
  return generateJSONLD({
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: APP_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/logo.png`,
      },
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
  });
}
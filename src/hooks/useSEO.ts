import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const BASE_TITLE = "Storm Business";
const BASE_URL = import.meta.env.VITE_SITE_URL || "https://seu-dominio-portfolio.com.br";

export const useSEO = ({ 
  title, 
  description, 
  keywords,
  canonicalUrl,
  ogImage = `${BASE_URL}/img/Logo%20Storm%20Business%20blue.png`
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | ${BASE_TITLE}`;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Update meta description
    updateMetaTag('description', description);
    
    // Update meta title
    updateMetaTag('title', `${title} | ${BASE_TITLE}`);

    // Update keywords if provided
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', `${title} | ${BASE_TITLE}`, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl || window.location.href, true);
    updateMetaTag('og:image', ogImage, true);

    // Update Twitter tags
    updateMetaTag('twitter:title', `${title} | ${BASE_TITLE}`, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl || window.location.href);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl || window.location.href);
      document.head.appendChild(canonicalLink);
    }

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      document.title = `${BASE_TITLE} | Transforme sua clínica em negócio de alta performance`;
    };
  }, [title, description, keywords, canonicalUrl, ogImage]);
};

export default useSEO;


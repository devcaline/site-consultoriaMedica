import { useCallback } from 'react';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const useAnalytics = () => {
  const trackEvent = useCallback((
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }, []);

  const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pagePath,
        page_title: pageTitle
      });
    }
  }, []);

  const trackFormSubmit = useCallback((formName: string, formData?: any) => {
    trackEvent('form_submit', 'engagement', formName, 1);
    
    // Track additional form data if provided
    if (formData && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit_detailed', {
        event_category: 'engagement',
        event_label: formName,
        custom_parameter_1: formData.clinica || 'unknown',
        custom_parameter_2: formData.desafio?.length > 0 ? 'has_challenge' : 'no_challenge'
      });
    }
  }, [trackEvent]);

  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    trackEvent('button_click', 'engagement', `${buttonName}_${location}`, 1);
  }, [trackEvent]);

  const trackScroll = useCallback((section: string, percentage: number) => {
    trackEvent('scroll', 'engagement', section, percentage);
  }, [trackEvent]);

  const trackWhatsAppClick = useCallback((location: string) => {
    trackEvent('whatsapp_click', 'conversion', location, 1);
  }, [trackEvent]);

  const trackTestimonialView = useCallback((testimonialId: string) => {
    trackEvent('testimonial_view', 'engagement', testimonialId, 1);
  }, [trackEvent]);

  const trackMethodologyStepView = useCallback((stepNumber: number) => {
    trackEvent('methodology_step_view', 'engagement', `step_${stepNumber}`, stepNumber);
  }, [trackEvent]);

  const trackFAQOpen = useCallback((questionId: string) => {
    trackEvent('faq_open', 'engagement', questionId, 1);
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackFormSubmit,
    trackButtonClick,
    trackScroll,
    trackWhatsAppClick,
    trackTestimonialView,
    trackMethodologyStepView,
    trackFAQOpen
  };
};

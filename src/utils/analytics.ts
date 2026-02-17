/**
 * Analytics utility for tracking user interactions
 * Currently set up for Google Analytics (gtag)
 * Can be easily adapted for Plausible, Umami, or other providers
 */

// Types for analytics events
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Track page views
 * Call this on route changes
 */
export const trackPageView = (url: string, title?: string): void => {
  if (typeof window === "undefined") return;

  // Google Analytics (gtag)
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_title: title || document.title,
      page_location: url,
      page_path: url,
    });
  }

  // Plausible Analytics (alternative)
  if (window.plausible) {
    window.plausible("pageview");
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.log("📊 Page View:", { url, title });
  }
};

/**
 * Track custom events
 * Usage: trackEvent({ action: 'click', category: 'button', label: 'contact_submit' })
 */
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: AnalyticsEvent): void => {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Plausible Analytics
  if (window.plausible) {
    window.plausible(action, {
      props: { category, label, value },
    });
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.log("📊 Event:", { action, category, label, value });
  }
};

/**
 * Track contact form submissions
 */
export const trackContactFormSubmit = (success: boolean): void => {
  trackEvent({
    action: "submit",
    category: "contact_form",
    label: success ? "success" : "error",
    value: success ? 1 : 0,
  });
};

/**
 * Track downloads (CV/Resume)
 */
export const trackDownload = (fileName: string): void => {
  trackEvent({
    action: "download",
    category: "file",
    label: fileName,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, label?: string): void => {
  trackEvent({
    action: "click",
    category: "external_link",
    label: label || url,
  });
};

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: string): void => {
  trackEvent({
    action: "click",
    category: "social",
    label: platform,
  });
};

// Extend window interface for TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plausible?: (event: string, options?: any) => void;
  }
}

/** for further agaar chage toh
 * Initialize analytics
 * Add this to your index.html or use a library
 *
 * For Google Analytics:
 * <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
 * <script>
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', 'GA_MEASUREMENT_ID');
 * </script>
 *
 * For Plausible (privacy-friendly):
 * <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
 */

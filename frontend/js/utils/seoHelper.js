/**
 * SEO Helper Utility
 * Dynamically updates document meta tags for improved SEO and social sharing.
 * 
 * @module seoHelper
 */

// Default meta values for the site
const DEFAULT_META = {
    title: 'EcoLife | Protect Our Planet & Animals',
    description: 'Join EcoLife to protect animals, save the environment, and create a greener future for all. Access tips, guides, and community features offline.',
    imageUrl: 'https://ecolife-app.com/assets/images/others/envirnoment-logo.webp',
    url: 'https://ecolife-app.com/',
    type: 'website',
    siteName: 'EcoLife'
};

/**
 * Updates or creates a meta tag in the document head.
 * @param {string} selector - CSS selector to find existing tag
 * @param {string} attribute - Attribute name (property or name)
 * @param {string} attributeValue - Value of the attribute
 * @param {string} content - Content value for the meta tag
 */
function setMetaTag(selector, attribute, attributeValue, content) {
    let element = document.querySelector(selector);

    if (!element) {
        // Create the element if it doesn't exist
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
    }

    element.setAttribute('content', content);
}

/**
 * Updates document meta tags for SEO and social sharing.
 * 
 * @param {Object} options - Meta tag options
 * @param {string} options.title - Page title (will append " | EcoLife" if not present)
 * @param {string} options.description - Page description
 * @param {string} [options.imageUrl] - Full URL to the page image
 * @param {string} [options.url] - Canonical URL of the page
 * @param {string} [options.type='article'] - OpenGraph type (article, website, etc.)
 * 
 * @example
 * updateMetaTags({
 *   title: 'Wildlife Conservation',
 *   description: 'Learn about the importance of protecting wildlife...',
 *   imageUrl: 'https://ecolife.com/images/wildlife.jpg'
 * });
 */
function updateMetaTags(options = {}) {
    const {
        title,
        description,
        imageUrl = DEFAULT_META.imageUrl,
        url = window.location.href,
        type = 'article'
    } = options;

    // Format title - append site name if not already present
    const formattedTitle = title
        ? (title.includes('EcoLife') ? title : `${title} | EcoLife`)
        : DEFAULT_META.title;

    // Update document title
    document.title = formattedTitle;

    // Update standard meta description
    setMetaTag(
        'meta[name="description"]',
        'name',
        'description',
        description || DEFAULT_META.description
    );

    // Update OpenGraph tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', formattedTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description || DEFAULT_META.description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', DEFAULT_META.siteName);

    // Update Twitter Card tags
    setMetaTag('meta[property="twitter:card"]', 'property', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[property="twitter:title"]', 'property', 'twitter:title', formattedTitle);
    setMetaTag('meta[property="twitter:description"]', 'property', 'twitter:description', description || DEFAULT_META.description);
    setMetaTag('meta[property="twitter:image"]', 'property', 'twitter:image', imageUrl);
    setMetaTag('meta[property="twitter:url"]', 'property', 'twitter:url', url);

    // Update canonical URL if present
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    console.log('[SEO Helper] Meta tags updated:', { title: formattedTitle, description, imageUrl, url });
}

/**
 * Resets meta tags to default site values.
 * Useful when navigating away from a specific page.
 */
function resetMetaTags() {
    updateMetaTags({
        title: DEFAULT_META.title,
        description: DEFAULT_META.description,
        imageUrl: DEFAULT_META.imageUrl,
        url: DEFAULT_META.url,
        type: DEFAULT_META.type
    });
    console.log('[SEO Helper] Meta tags reset to defaults');
}

/**
 * Gets current meta tag values from the document.
 * @returns {Object} Current meta values
 */
function getCurrentMeta() {
    return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '',
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
        ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
        ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
        ogUrl: document.querySelector('meta[property="og:url"]')?.content || '',
        twitterTitle: document.querySelector('meta[property="twitter:title"]')?.content || '',
        twitterDescription: document.querySelector('meta[property="twitter:description"]')?.content || '',
        twitterImage: document.querySelector('meta[property="twitter:image"]')?.content || ''
    };
}

// Export for ES modules (if supported)
if (typeof window !== 'undefined') {
    window.SEOHelper = {
        updateMetaTags,
        resetMetaTags,
        getCurrentMeta,
        DEFAULT_META
    };
}

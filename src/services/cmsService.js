/**
 * Service to interact with the WordPress CMS API.
 */

// In-memory cache to prevent redundant network requests during the same session/navigation.
const acfCache = new Map();

/**
 * Fetches the Advanced Custom Fields (ACF) data for a specific page by its slug.
 * 
 * @param {string} slug - The slug of the page to fetch.
 * @returns {Promise<object|null>} - The ACF object if found, otherwise null.
 */
export async function fetchPageACFBySlug(slug) {
  // O site agora é 100% estático (local-only), evitando qualquer requisição externa
  return null;
}

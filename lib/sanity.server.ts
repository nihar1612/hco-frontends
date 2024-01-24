import { createClient } from 'next-sanity';
import { config, sanityClient } from './sanity';

// Set up a preview client with serverless authentication for drafts
export const sanityClientPreview = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper function for easily switching between normal client and preview client
export function getSanityClient(usePreview) {
  return usePreview ? sanityClientPreview : sanityClient;
}

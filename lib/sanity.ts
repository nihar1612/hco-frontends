import { createPreviewSubscriptionHook, createCurrentUserHook, createClient } from 'next-sanity';
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-07-21',
  useCdn: process.env.NODE_ENV === 'production',
};
export const usePreviewSubscription = createPreviewSubscriptionHook(config);
export const useCurrentUser = createCurrentUserHook(config);
export const sanityClient = createClient(config);

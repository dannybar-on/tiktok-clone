import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'tdcwtmpw',
  dataset: 'production',
  apiVersion: '2022-10-18',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

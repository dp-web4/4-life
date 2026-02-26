'use client';

import { useEffect } from 'react';
import { trackPageVisit } from '@/lib/exploration';

/**
 * Invisible client component that records a page visit.
 * Drop into server-component pages that can't call trackPageVisit directly.
 */
export default function PageTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackPageVisit(slug);
  }, [slug]);
  return null;
}

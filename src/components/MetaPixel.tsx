'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const PIXEL_ID = '1652329863197521';

type FbqStub = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
};

function loadPixel() {
  if (window.fbq) return;

  const fbq: FbqStub = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as FbqStub;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement('script');
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.async = true;
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  window.fbq('init', PIXEL_ID);
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    loadPixel();
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  return null;
}

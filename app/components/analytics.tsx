"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Google Analytics placeholder
    // Uncomment and add GA_MEASUREMENT_ID when ready
    // window.gtag('config', 'GA_MEASUREMENT_ID', { page_path: pathname });

    // Hotjar placeholder
    // Uncomment and add Hotjar ID when ready
    // (function(h,o,t,j,a,r){h.hj=h.hj||function(){(h._hj=h._hj||[]).push(arguments)}; ... })(window,document,'https://static.hotjar.com/c/hotjar-');

    console.log(`[Analytics] Page view: ${pathname}`);
  }, [pathname]);

  return null;
}

const MOBILE_BREAKPOINT = 768; // Tailwind md breakpoint

export default function isMobile(): boolean {
    // Check both screen width and device characteristics
    const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileUserAgent = /android|iphone|ipad|ipod|opera mini|mobile|windows phone|blackberry/i
      .test(navigator.userAgent);

    console.log(`isMobileWidth: ${isMobileWidth}, isTouchDevice: ${isTouchDevice}, isMobileUserAgent: ${isMobileUserAgent}`);
  
    // Could use different combinations based on your needs
    return isMobileWidth && (isTouchDevice || isMobileUserAgent);
}

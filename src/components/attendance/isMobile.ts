function isMobileUserAgent(): boolean {
    const userAgent: string = 
      navigator.userAgent || 
      navigator.vendor || 
      (window as any).opera;
  
    return /android|iphone|ipad|ipod|opera mini|mobile|windows phone|blackberry/i
      .test(userAgent);
  }

const MOBILE_BREAKPOINT = 768; // Tailwind md breakpoint

function isMobileScreenWidth(): boolean {
    const screenWidth: number = window.innerWidth;
    return screenWidth < MOBILE_BREAKPOINT;
}

function isMobile(): boolean {
    // Check both screen width and device characteristics
    const isMobileWidth = window.innerWidth < 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileUserAgent = /android|iphone|ipad|ipod|opera mini|mobile|windows phone|blackberry/i
      .test(navigator.userAgent);

    console.log(`isMobileWidth: ${isMobileWidth}, isTouchDevice: ${isTouchDevice}, isMobileUserAgent: ${isMobileUserAgent}`);
  
    // Could use different combinations based on your needs
    return isMobileWidth && (isTouchDevice || isMobileUserAgent);
}

export { isMobileUserAgent, isMobileScreenWidth, isMobile };
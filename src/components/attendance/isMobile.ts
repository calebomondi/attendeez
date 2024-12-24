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

export { isMobileUserAgent, isMobileScreenWidth };
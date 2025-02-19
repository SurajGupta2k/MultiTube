// AdGuard configuration and rules
const adguardConfig = {
  // Basic YouTube ad blocking rules
  rules: [
    // Block video ads
    '||youtube.com/get_video_info?*=adunit&',
    '||youtube.com/pagead/*',
    '||youtube.com/get_midroll_info?*',
    
    // Block overlay ads
    '##.ytp-ad-overlay-container',
    '##.ytp-ad-text-overlay',
    '##.video-ads',
    '##.ytp-ad-progress-list',
    
    // Block ad elements
    '##.ytd-companion-slot-renderer',
    '##.ytd-action-companion-ad-renderer',
    '##.ytd-watch-next-secondary-results-renderer > .ytd-compact-promoted-video-renderer',
    
    // Block tracking
    '||doubleclick.net^$domain=youtube.com',
    '||google-analytics.com^$domain=youtube.com',
    '||googleadservices.com^$domain=youtube.com'
  ],
  
  // Initialize AdGuard
  init: () => {
    if (typeof window !== 'undefined') {
      window.AG_onLoad = function(func) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          func();
        } else {
          document.addEventListener('DOMContentLoaded', func);
        }
      };
      
      // Apply rules when AdGuard is loaded
      window.AG_onLoad(() => {
        if (window.AdguardSettings) {
          adguardConfig.rules.forEach(rule => {
            window.AdguardSettings.rules.push(rule);
          });
          
          // Force rules update
          if (window.AdguardSettings.update) {
            window.AdguardSettings.update();
          }
        }
      });
    }
  }
};

export default adguardConfig; 
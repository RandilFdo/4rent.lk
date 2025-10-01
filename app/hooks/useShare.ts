import { useCallback } from 'react';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const useShare = () => {
  const share = useCallback(async (shareData: ShareData) => {
    // Check if Web Share API is supported
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return { success: true, method: 'native' };
      } catch (error) {
        // User cancelled sharing or error occurred
        if (error instanceof Error && error.name === 'AbortError') {
          return { success: false, method: 'cancelled' };
        }
        console.log('Share failed:', error);
        return { success: false, method: 'error' };
      }
    } else {
      // Fallback to clipboard for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        return { success: true, method: 'clipboard' };
      } catch (error) {
        // Final fallback - select text for manual copying
        try {
          const textArea = document.createElement('textarea');
          textArea.value = shareData.url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          return { success: true, method: 'clipboard-fallback' };
        } catch (fallbackError) {
          console.error('All share methods failed:', fallbackError);
          return { success: false, method: 'failed' };
        }
      }
    }
  }, []);

  return { share };
};

export default useShare;

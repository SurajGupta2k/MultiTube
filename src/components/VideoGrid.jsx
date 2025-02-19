import React, { useEffect, useRef, useState } from 'react';

// This component displays a grid of YouTube video players
const VideoGrid = ({ videoIds, isPlaying }) => {
  // Refs to store YouTube player instances
  const playerRefs = useRef({});
  // Track if YouTube API is loaded and ready
  const [apiReady, setApiReady] = useState(false);
  // Control whether to show video players or just URLs
  const [showPlayers, setShowPlayers] = useState(false);

  // Load YouTube IFrame API on component mount
  useEffect(() => {
    // Load the IFrame Player API code asynchronously
    const loadYouTubeAPI = () => {
      // Avoid loading API script multiple times
      const existingScript = document.getElementById('youtube-api');
      if (existingScript) return;

      // Create and insert YouTube API script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.id = 'youtube-api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    if (!window.YT) {
      // Load API if not available
      loadYouTubeAPI();
      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else if (window.YT && window.YT.Player) {
      // API already loaded
      setApiReady(true);
    }

    // Cleanup players on unmount
    return () => {
      Object.values(playerRefs.current).forEach(player => {
        if (player && typeof player.destroy === 'function') {
          player.destroy();
        }
      });
    };
  }, []);

  // Show players when play is triggered
  useEffect(() => {
    if (isPlaying && !showPlayers) {
      setShowPlayers(true);
    }
  }, [isPlaying]);

  // Create players when needed
  useEffect(() => {
    if (showPlayers && apiReady) {
      videoIds.forEach((videoId) => {
        if (!playerRefs.current[videoId]) {
          createPlayer(videoId);
        }
      });
    }
  }, [videoIds, apiReady, showPlayers]);

  // Synchronize video playback
  useEffect(() => {
    if (isPlaying && apiReady && showPlayers) {
      Object.values(playerRefs.current).forEach(player => {
        if (player && typeof player.playVideo === 'function') {
          player.playVideo();
        }
      });
    }
  }, [isPlaying, apiReady, showPlayers]);

  // Create a new YouTube player instance
  const createPlayer = (videoId) => {
    if (!window.YT || !window.YT.Player) {
      console.error('YouTube API not ready');
      return;
    }

    try {
      // Configure player options
      const playerConfig = {
        height: '200',
        width: '356',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          modestbranding: 1,
          rel: 0,
          fs: 1,
          playsinline: 1,
          iv_load_policy: 3,
          showinfo: 0,
          cc_load_policy: 0,
          disablekb: 0,
          color: 'white',
          autohide: 0,
          controls: 2 // Force showing controls
        },
        events: {
          onReady: (event) => {
            console.log('Player ready:', videoId);
            // Customize player appearance
            const iframe = event.target.getIframe();
            const css = `
              .ytp-chrome-top,
              .ytp-show-cards-title,
              .ytp-youtube-button,
              .ytp-pip-button {
                display: none !important;
              }
              .ytp-settings-button {
                display: block !important;
                opacity: 1 !important;
              }
              .ytp-chrome-controls {
                opacity: 1 !important;
              }
              .ytp-chrome-bottom {
                opacity: 1 !important;
                display: block !important;
              }
            `;
            
            // Inject custom styles
            try {
              const iframeDoc = iframe.contentWindow.document;
              const styleTag = iframeDoc.createElement('style');
              styleTag.type = 'text/css';
              styleTag.textContent = css;
              iframeDoc.head.appendChild(styleTag);
            } catch (e) {
              console.warn('Could not inject custom styles:', e);
            }
          },
          onError: (event) => {
            console.error('Player error:', event.data);
          }
        }
      };

      // Create player instance
      const playerElement = document.getElementById(`player-${videoId}`);
      if (playerElement) {
        playerRefs.current[videoId] = new window.YT.Player(`player-${videoId}`, playerConfig);
      }
    } catch (error) {
      console.error('Error creating YouTube player:', error);
    }
  };

  // Show list of video URLs before playing
  if (!showPlayers) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto mt-6">
        {videoIds.map((videoId) => (
          <div key={videoId} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <span className="text-gray-300">https://www.youtube.com/watch?v={videoId}</span>
            <button className="p-2 text-red-500 hover:text-red-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  }

  // Show grid of video players
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {videoIds.map((videoId) => (
        <div key={videoId} className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
          <div id={`player-${videoId}`} className="w-full h-full"></div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Play, MessageCircle, X, Settings, Maximize, Volume2 } from 'lucide-react';

// This is the main App component that manages the multi-video player functionality
function App() {
  // State for managing video URLs, playback state, device type, chat visibility and controls
  const [videoUrls, setVideoUrls] = useState(['']); // Array of video URLs, initialized with one empty string
  const [isPlaying, setIsPlaying] = useState(false); // Controls whether videos are playing
  const [isMobile, setIsMobile] = useState(false); // Tracks if user is on mobile device
  const [activeChatIndices, setActiveChatIndices] = useState([]); // Indices of videos with active chat overlays
  const [showControls, setShowControls] = useState(null); // Index of video showing controls overlay
  const [showChatButtons, setShowChatButtons] = useState(true); // Toggles live chat button visibility

  // Effect to detect mobile devices and handle window resizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Set mobile mode if width < 768px
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Maximum number of videos allowed (2 for mobile, 4 for desktop)
  const maxVideos = isMobile ? 2 : 4;

  // Adds a new empty video input field
  const addVideoInput = () => {
    if (videoUrls.length < maxVideos) {
      setVideoUrls([...videoUrls, '']);
    }
  };

  // Removes a video input at specified index
  const removeVideoInput = (index) => {
    const newUrls = videoUrls.filter((_, i) => i !== index);
    setVideoUrls(newUrls.length ? newUrls : ['']); // Keep at least one input
  };

  // Updates video URL at specified index
  const updateVideoUrl = (index, url) => {
    const newUrls = [...videoUrls];
    newUrls[index] = url;
    setVideoUrls(newUrls);
  };

  // Extracts YouTube video ID from various URL formats
  const getVideoId = (url) => {
    if (!url) return null;

    try {
      // Handle youtu.be format
      if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1]?.split(/[#?]/)[0] || null;
      }

      // Handle youtube.com format
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        // Check for live video format
        if (urlObj.pathname.includes('/live/')) {
          return urlObj.pathname.split('/live/')[1]?.split(/[#?]/)[0] || null;
        }
        return urlObj.searchParams.get('v') || null;
      }

      return null;
    } catch {
      // Fallback to regex if URL parsing fails
      const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=|\/live\/))([^"&?/\s]{11})/);
      return match?.[1] || null;
    }
  };

  // Starts playback of all videos
  const playAll = () => {
    setIsPlaying(true);
  };

  // Determines CSS class for video grid layout based on number of valid videos
  const getGridClassName = () => {
    const validVideos = videoUrls.filter(url => getVideoId(url)).length;
    return `layout-${validVideos}`;
  };

  // Toggles chat overlay for video at specified index
  const toggleChat = (index) => {
    setActiveChatIndices(prevIndices =>
      prevIndices.includes(index)
        ? prevIndices.filter(i => i !== index)
        : [...prevIndices, index]
    );
  };

  // Toggles controls overlay for video at specified index
  const toggleControls = (index) => {
    setShowControls(showControls === index ? null : index);
  };

  return (
    <div className="page-container">
      {!isPlaying ? (
        // URL Input Mode
        <div className="content-container">
          <header className="header">
            <div className="logo-container">
              <img src="/logo.svg" alt="MultiTube Logo" className="app-logo" />
            </div>
            <h1 className="header-title">MultiTube</h1>
            <p className="header-subtitle">
              Watch multiple YouTube videos simultaneously
              {isMobile ? ' (max 2 videos on mobile)' : ' (max 4 videos)'}
            </p>
          </header>

          <div className="main-content">
            <div className="instructions-section">
              <div className="instructions">
                <h2 className="instructions-title">How to Use:</h2>
                <ol className="instructions-list">
                  <li>Paste YouTube video URLs in the input fields</li>
                  <li>Click the <Plus size={16} className="inline-icon" /> button to add more videos (up to {isMobile ? '2' : '4'})</li>
                  <li>Use the <Trash2 size={16} className="inline-icon" /> button to remove unwanted videos</li>
                  <li>Click the <Play size={16} className="inline-icon" /> Play All button to start watching</li>
                </ol>
                <p className="instructions-note">
                  Supported URL formats:
                  <br />• youtube.com/watch?v=VIDEO_ID
                  <br />• youtu.be/VIDEO_ID
                </p>
              </div>
            </div>

            <div className="input-section">
              <div className="input-container">
                {videoUrls.map((url, index) => (
                  <div key={index} className="input-row">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => updateVideoUrl(index, e.target.value)}
                      placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
                      className="url-input"
                    />
                    <button
                      onClick={() => removeVideoInput(index)}
                      className="remove-button"
                      aria-label="Remove video"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                
                <div className="settings-container">
                  <label className="settings-label">
                    <input
                      type="checkbox"
                      checked={showChatButtons}
                      onChange={() => setShowChatButtons(prev => !prev)}
                      className="settings-checkbox"
                    />
                    Show Live Chat Buttons
                  </label>
                </div>
                
                <div className="button-container">
                  {videoUrls.length < maxVideos && (
                    <button
                      onClick={addVideoInput}
                      className="add-button"
                    >
                      <Plus size={20} />
                      Add Video
                    </button>
                  )}
                  <button
                    onClick={playAll}
                    className="play-button"
                    disabled={!videoUrls.some(url => getVideoId(url))}
                  >
                    <Play size={20} />
                    Play All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Video Player Mode
        <div className="video-player-mode">
          <div className="video-player-container">
            <div className={`video-grid ${getGridClassName()}`}>
              {videoUrls.map((url, index) => {
                const videoId = getVideoId(url);
                if (!videoId) return null;
                
                return (
                  <div 
                    key={index} 
                    className="video-container"
                    onMouseEnter={() => toggleControls(index)}
                    onMouseLeave={() => toggleControls(null)}
                  >
                    {/* YouTube Video Player */}
                    <iframe
                      title={`YouTube video ${index + 1}`}
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&showinfo=1&rel=0&enablejsapi=1&widgetid=1&liveChatId=all`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="video-frame"
                    />
                    {/* Live Chat Button */}
                    {showChatButtons && (
                      <button className="live-chat-button" onClick={() => toggleChat(index)}>
                        <MessageCircle size={20} />
                        <span>Live chat</span>
                      </button>
                    )}
                    {/* Video Controls Overlay */}
                    {showControls === index && (
                      <div className="video-controls-overlay">
                        <div className="controls-top">
                          <div className="controls-right">
                            <button className="control-button">
                              <Settings size={20} />
                              <span>Settings</span>
                            </button>
                            <button className="control-button">
                              <Maximize size={20} />
                              <span>Fullscreen</span>
                            </button>
                          </div>
                        </div>
                        <div className="controls-bottom">
                          <div className="bottom-controls">
                            <div className="left-controls">
                              <button className="control-button">
                                <Volume2 size={20} />
                                <span>Volume</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Live Chat Overlay */}
                    {activeChatIndices.includes(index) && (
                      <div className="chat-overlay">
                        <div className="chat-header">
                          <div className="chat-header-content">
                            <span className="chat-title">Live Chat</span>
                            <button onClick={() => toggleChat(index)} className="close-chat-button">
                              <X size={16} />
                            </button>
                          </div>
                          <div className="chat-options">
                            <button className="chat-option active">Live chat</button>
                            <button className="chat-option">Top chat</button>
                          </div>
                        </div>
                        <iframe
                          src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${window.location.hostname}&dark_theme=1&parent=${window.location.hostname}`}
                          className="chat-frame"
                          frameBorder="0"
                          allowTransparency="true"
                        ></iframe>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import VideoInput from './VideoInput';
import VideoGrid from './VideoGrid';

const MultiVideoPlayer = () => {
  const [videoUrls, setVideoUrls] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  const handleAddVideo = (url) => {
    if (url) {
      // Extract video ID from YouTube URL
      const videoId = extractYouTubeId(url);
      if (videoId) {
        // Check if video already exists
        if (videoUrls.includes(videoId)) {
          setError('This video has already been added!');
          setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
          return;
        }
        setVideoUrls(prev => [...prev, videoId]);
        setError(''); // Clear any existing error
      } else {
        setError('Invalid YouTube URL!');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlayAll = () => {
    setIsPlaying(true);
  };

  const handleClearAll = () => {
    setVideoUrls([]);
    setIsPlaying(false);
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto p-5 text-center">
      <h1 className="text-4xl font-bold mb-6">Multi YouTube Player</h1>
      <VideoInput onAddVideo={handleAddVideo} />
      {error && (
        <div className="text-red-500 bg-red-100 rounded-lg p-3 my-3 font-semibold text-sm animate-[fadeIn_0.3s_ease-in]">
          {error}
        </div>
      )}
      <div className="flex items-center justify-center gap-4 my-5">
        <button 
          onClick={handlePlayAll} 
          disabled={videoUrls.length === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            videoUrls.length === 0 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          Play All
        </button>
        <button 
          onClick={handleClearAll}
          disabled={videoUrls.length === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            videoUrls.length === 0 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Clear All
        </button>
      </div>
      <VideoGrid videoIds={videoUrls} isPlaying={isPlaying} />
    </div>
  );
};

export default MultiVideoPlayer; 
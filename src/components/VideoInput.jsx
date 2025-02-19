import React, { useState } from 'react';

// This component handles input of YouTube video URLs
const VideoInput = ({ onAddVideo }) => {
  // State to store the current URL input value
  const [url, setUrl] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    onAddVideo(url); // Pass URL to parent component
    setUrl(''); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 max-w-2xl mx-auto">
      {/* Text input for YouTube URL */}
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Submit button to add the video */}
      <button 
        type="submit" 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Add Video
      </button>
    </form>
  );
};

export default VideoInput;
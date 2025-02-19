# MultiTube - Watch Multiple YouTube Videos Simultaneously

![MultiTube Logo](/public/logo192.png)

MultiTube is a React-based web application that solves a common limitation in web browsers - the inability to play multiple YouTube videos with audio simultaneously. While most browsers and devices restrict multiple video playback with audio, MultiTube overcomes this limitation, allowing users to watch and listen to multiple YouTube videos at the same time.

## Why MultiTube?

Traditional web browsers and YouTube's interface have limitations:
- Most browsers block automatic playback of multiple videos with audio
- Mobile devices typically restrict background video playback and multi-video audio
- YouTube's native interface doesn't support watching multiple videos simultaneously

MultiTube addresses these challenges by:
- Enabling simultaneous playback of multiple YouTube videos with audio
- Supporting up to 4 videos on desktop and 2 on mobile devices
- Providing individual audio controls for each video
- Maintaining synchronized playback across all videos

This makes it perfect for:
- Comparing multiple versions of the same content
- Following multiple live streams simultaneously
- Creating your own multi-view experience
- Music mixing or video comparison
- Educational purposes where multiple video sources need to be watched together

## Features

- Watch up to 4 YouTube videos simultaneously (2 on mobile devices)
- Responsive grid layout that adapts to the number of active videos
- Live chat support for each video
- Video controls including settings, fullscreen, and volume
- Simple and intuitive URL input interface
- Supports both youtube.com and youtu.be URL formats
- Mobile-responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd youtube-multi-player
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## Usage

1. Enter YouTube URLs in the input fields
2. Add more videos using the "+" button (up to 4 videos on desktop, 2 on mobile)
3. Remove unwanted videos using the trash icon
4. Click "Play All" to start watching
5. Toggle live chat for each video using the chat icon
6. Use video controls for settings, fullscreen, and volume
7. Return to URL input using the "Back to URL Input" button

## Project Structure

```
youtube-multi-player/
├── public/
│   ├── index.html
│   ├── logo.svg
│   └── manifest.json
├── src/
│   ├── components/
│   ├── App.js          # Main application component
│   ├── index.js        # Application entry point
│   ├── index.css       # Global styles
│   └── reportWebVitals.js
└── package.json
```

### Key Files

- `src/App.js`: Main application component containing core functionality
- `src/index.js`: Application entry point and React initialization
- `src/index.css`: Global styles and layout definitions

## Supported URL Formats

MultiTube supports the following YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`

## Features in Detail

### Video Grid Layout
- Dynamic grid system that adjusts based on the number of active videos
- Responsive design that adapts to different screen sizes
- Maximum of 4 videos on desktop and 2 on mobile devices

### Live Chat Integration
- Native YouTube live chat integration for each video
- Toggle between live chat and top chat modes
- Collapsible chat interface

### Video Controls
- Individual controls for each video
- Settings management
- Fullscreen capability
- Volume control
- Hover-activated control overlay

## Browser Support

MultiTube works on all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React
- Uses YouTube iFrame API
- Icons provided by Lucide React

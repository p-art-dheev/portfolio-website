# Assets Directory

## 📁 Folder Structure

```
assets/
├── images/
│   ├── profile.jpg       ← Your profile picture (recommended: 400x400px)
│   └── album-cover.jpg   ← Album cover art for music player (recommended: 300x300px)
└── audio/
    └── track.mp3         ← Your favorite music track
```

## 📸 Profile Image
- **Location**: `public/assets/images/profile.jpg`
- **Formats supported**: JPG, PNG, WebP
- **Recommended size**: 400x400px (square)
- **File size**: Keep under 500KB for best performance

## 🎵 Music Player
- **Album cover**: `public/assets/images/album-cover.jpg`
  - Formats: JPG, PNG
  - Recommended: 300x300px square
- **Audio file**: `public/assets/audio/track.mp3`
  - Formats: MP3, WAV, OGG
  - Recommended: MP3 for best browser compatibility

## ⚙️ Configuration

After adding your files, update the paths in `src/config.js`:

```javascript
personal: {
  profileImage: '/assets/images/profile.jpg',
},

music: {
  title: 'Your Song Title',
  artist: 'Artist Name',
  album: 'Album Name',
  coverArt: '/assets/images/album-cover.jpg',
  audioFile: '/assets/audio/track.mp3',
}
```

## 💡 Tips
- Use web-optimized images (compressed JPG/PNG)
- Keep audio files under 10MB
- Use descriptive filenames
- Test in browser after adding files

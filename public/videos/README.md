# Video Background Setup

## Instructions

Place your hero background video in this directory with the name `hero-background.mp4`.

### Video Requirements

- **Format**: MP4 (H.264 codec recommended for best browser compatibility)
- **Recommended Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **File Size**: Keep under 10MB for optimal loading performance
- **Duration**: 10-30 seconds (looping video)
- **Optimization**: Compress the video to balance quality and file size

### Optimization Tips

1. Use a video compression tool like HandBrake or FFmpeg
2. Lower the bitrate to reduce file size
3. Consider using a poster image as fallback
4. Test loading performance on slower connections

### Alternative Formats

You can also provide additional formats for better browser support:
- WebM format: `hero-background.webm`
- OGG format: `hero-background.ogg`

Update the video source in `/src/app/components/home/hero/index.tsx` if using different filenames or formats.

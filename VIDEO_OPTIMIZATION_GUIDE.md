# Video Optimization Guide

## Overview
This guide helps you optimize videos for faster loading on the website. We've implemented lazy loading and WebM format support to significantly reduce file sizes (60-80% smaller than MP4).

## What Has Been Done

### 1. Optimized Video Component
- ✅ Created `components/OptimizedVideo.tsx` with:
  - Lazy loading (videos load only when visible)
  - Intersection Observer API for efficient loading
  - WebM format support (smaller files)
  - MP4 fallback for older browsers
  - Poster image support
  - Preload="none" to avoid loading all videos at once

### 2. Updated Page Component
- ✅ All 6 video elements in `app/page.tsx` now use `OptimizedVideo` component
- Videos: Task_final, planner_final, strike_final, analytics_final, import_final, startup_final

## How to Optimize Your Videos

### Prerequisites
Install FFmpeg:
- **Windows**: Download from https://ffmpeg.org/download.html or use:
  ```powershell
  winget install ffmpeg
  # or
  choco install ffmpeg
  ```

- **macOS**:
  ```bash
  brew install ffmpeg
  ```

- **Linux (Ubuntu/Debian)**:
  ```bash
  sudo apt install ffmpeg
  ```

### Step 1: Run the Conversion Script

**Windows (PowerShell):**
```powershell
cd scripts
.\convert-videos.ps1
```

**macOS/Linux:**
```bash
cd scripts
chmod +x convert-videos.sh
./convert-videos.sh
```

### Step 2: What the Script Does

The script will:
1. Convert each `.mp4` file to `.webm` format (60-80% smaller)
2. Create poster images (`_poster.jpg`) for each video
3. Keep original MP4 files as fallback

### Step 3: Expected Output Files

After running the script, you should have:
```
public/videos/
  ├── Task_final.mp4 (original)
  ├── Task_final.webm (optimized - smaller)
  ├── Task_final_poster.jpg (thumbnail)
  ├── planner_final.mp4
  ├── planner_final.webm
  ├── planner_final_poster.jpg
  ├── ... (same for all 6 videos)
```

## Manual Conversion (Alternative)

If you prefer to convert manually:

### Convert to WebM:
```bash
ffmpeg -i public/videos/Task_final.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -c:a libopus \
  -b:a 64k \
  Task_final.webm
```

### Create Poster Image:
```bash
ffmpeg -i public/videos/Task_final.mp4 \
  -ss 00:00:01 \
  -vframes 1 \
  -vf "scale=1280:-1" \
  -q:v 2 \
  Task_final_poster.jpg
```

## Performance Benefits

### Before Optimization:
- All 6 videos load immediately
- Large MP4 files (could be 5-10MB each)
- Total initial load: ~30-60MB
- Slow page load, especially on mobile

### After Optimization:
- Videos load only when scrolled into view (lazy loading)
- WebM files are 60-80% smaller
- Poster images show instantly
- Total initial load: ~500KB (posters only)
- Much faster page load!

## How It Works

1. **Lazy Loading**: Videos use Intersection Observer API
   - Videos only load when they're 100px away from viewport
   - Saves bandwidth for users who don't scroll that far

2. **WebM Format**: 
   - Modern, efficient codec (VP9)
   - Better compression than MP4
   - Supported by all modern browsers

3. **Progressive Enhancement**:
   - Browser tries WebM first (smaller)
   - Falls back to MP4 if WebM not supported
   - Shows poster image while loading

## Testing

After optimization:
1. Check browser DevTools Network tab
2. Videos should load only when visible
3. File sizes should be much smaller
4. Page load time should be significantly faster

## Troubleshooting

### Script doesn't run:
- Make sure FFmpeg is installed and in PATH
- Check file paths are correct
- Verify MP4 files exist in `public/videos/`

### Videos not showing:
- Check browser console for errors
- Verify WebM files are created
- Check that poster images exist

### Still slow loading:
- Check network tab to see actual file sizes
- Consider further compression with lower CRF (try 35-40)
- Ensure lazy loading is working (check Network tab)

## Additional Optimization Options

If you need even smaller files:

1. **Lower CRF value** (more compression, lower quality):
   ```bash
   -crf 35  # Instead of 30
   ```

2. **Reduce resolution** (if videos are too large):
   ```bash
   -vf "scale=960:-1"  # Instead of 1280
   ```

3. **Reduce frame rate** (for simple animations):
   ```bash
   -r 15  # 15 fps instead of 30
   ```

## Notes

- Original MP4 files are kept as fallback
- WebM files work in: Chrome, Firefox, Edge, Opera, Safari (modern versions)
- MP4 fallback works in older browsers
- Poster images improve perceived performance (instant visual feedback)


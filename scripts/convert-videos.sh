#!/bin/bash

# Video Optimization Script
# Converts MP4 videos to WebM format (smaller size) and creates poster images
# Usage: ./convert-videos.sh

# Resolve paths relative to this script's directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
VIDEOS_DIR="$ROOT_DIR/public/videos"
OUTPUT_DIR="$ROOT_DIR/public/videos"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting video optimization...${NC}"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${YELLOW}FFmpeg is not installed. Please install it first:${NC}"
    echo "  macOS: brew install ffmpeg"
    echo "  Ubuntu/Debian: sudo apt install ffmpeg"
    echo "  Windows: Download from https://ffmpeg.org/download.html"
    exit 1
fi

# List of videos to convert
videos=(
    "Task_final"
    "planner_final"
    "strike_final"
    "analytics_final"
    "import_final"
    "startup_final"
)

for video in "${videos[@]}"; do
    input_file="${VIDEOS_DIR}/${video}.mp4"
    
    if [ ! -f "$input_file" ]; then
        echo -e "${YELLOW}Warning: ${input_file} not found. Skipping...${NC}"
        continue
    fi
    
    echo -e "${GREEN}Processing ${video}...${NC}"
    
    # Convert to WebM format (VP9 codec, high quality, smaller size)
    webm_output="${OUTPUT_DIR}/${video}.webm"
    echo "  Converting to WebM..."
    ffmpeg -i "$input_file" \
        -c:v libvpx-vp9 \
        -crf 30 \
        -b:v 0 \
        -c:a libopus \
        -b:a 64k \
        -y \
        "$webm_output" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        # Get file sizes
        original_size=$(du -h "$input_file" | cut -f1)
        webm_size=$(du -h "$webm_output" | cut -f1)
        echo "  ✅ WebM created: ${original_size} → ${webm_size}"
    else
        echo "  ❌ Failed to create WebM for ${video}"
    fi
    
    # Create poster image (first frame)
    poster_output="${OUTPUT_DIR}/${video}_poster.jpg"
    echo "  Creating poster image..."
    ffmpeg -i "$input_file" \
        -ss 00:00:01 \
        -vframes 1 \
        -vf "scale=1280:-1" \
        -q:v 2 \
        -y \
        "$poster_output" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Poster created: ${poster_output}"
    else
        echo "  ❌ Failed to create poster for ${video}"
    fi
    
    echo ""
done

echo -e "${GREEN}Video optimization complete!${NC}"
echo ""
echo "Summary:"
echo "  - WebM files created in ${OUTPUT_DIR}"
echo "  - Poster images created in ${OUTPUT_DIR}"
echo "  - Original MP4 files kept as fallback"


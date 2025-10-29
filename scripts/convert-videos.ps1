# Video Optimization Script for Windows PowerShell
# Converts MP4 videos to WebM format (smaller size) and creates poster images
# Usage: .\convert-videos.ps1

# Resolve paths relative to this script's directory
$RootDir = Split-Path -Path $PSScriptRoot -Parent
$VIDEOS_DIR = Join-Path $RootDir "public\videos"
$OUTPUT_DIR = Join-Path $RootDir "public\videos"

Write-Host "Starting video optimization..." -ForegroundColor Green

# Check if FFmpeg is installed
try {
    $null = Get-Command ffmpeg -ErrorAction Stop
    Write-Host "FFmpeg found!" -ForegroundColor Green
} catch {
    Write-Host "FFmpeg is not installed. Please install it first:" -ForegroundColor Yellow
    Write-Host "  1. Download from: https://ffmpeg.org/download.html"
    Write-Host "  2. Or use chocolatey: choco install ffmpeg"
    Write-Host "  3. Or use winget: winget install ffmpeg"
    exit 1
}

# List of videos to convert
$videos = @(
    "Task_final",
    "planner_final",
    "strike_final",
    "analytics_final",
    "import_final",
    "startup_final"
)

foreach ($video in $videos) {
    $inputFile = Join-Path $VIDEOS_DIR "${video}.mp4"
    
    if (-not (Test-Path $inputFile)) {
        Write-Host "Warning: ${inputFile} not found. Skipping..." -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Processing ${video}..." -ForegroundColor Green
    
    # Convert to WebM format (VP9 codec, high quality, smaller size)
    $webmOutput = Join-Path $OUTPUT_DIR "${video}.webm"
    Write-Host "  Converting to WebM..."
    
    $ffmpegArgs = @(
        "-i", "`"$inputFile`"",
        "-c:v", "libvpx-vp9",
        "-crf", "30",
        "-b:v", "0",
        "-c:a", "libopus",
        "-b:a", "64k",
        "-y",
        "`"$webmOutput`""
    )
    
    $process = Start-Process -FilePath "ffmpeg" -ArgumentList $ffmpegArgs -NoNewWindow -Wait -PassThru
    
    if ($process.ExitCode -eq 0) {
        $originalSize = (Get-Item $inputFile).Length / 1MB
        $webmSize = (Get-Item $webmOutput).Length / 1MB
        Write-Host "  ✅ WebM created: $([math]::Round($originalSize, 2)) MB → $([math]::Round($webmSize, 2)) MB" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Failed to create WebM for ${video}" -ForegroundColor Red
    }
    
    # Create poster image (first frame)
    $posterOutput = Join-Path $OUTPUT_DIR "${video}_poster.jpg"
    Write-Host "  Creating poster image..."
    
    $posterArgs = @(
        "-i", "`"$inputFile`"",
        "-ss", "00:00:01",
        "-vframes", "1",
        "-vf", "scale=1280:-1",
        "-q:v", "2",
        "-y",
        "`"$posterOutput`""
    )
    
    $process = Start-Process -FilePath "ffmpeg" -ArgumentList $posterArgs -NoNewWindow -Wait -PassThru
    
    if ($process.ExitCode -eq 0) {
        Write-Host "  ✅ Poster created: ${posterOutput}" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Failed to create poster for ${video}" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "Video optimization complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:"
Write-Host "  - WebM files created in ${OUTPUT_DIR}"
Write-Host "  - Poster images created in ${OUTPUT_DIR}"
Write-Host "  - Original MP4 files kept as fallback"


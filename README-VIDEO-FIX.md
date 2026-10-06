# Intro video Chrome / mobile fix

- Uses `object-fit: contain` so the 16:9 video never exceeds the browser viewport.
- Uses `100dvh`/viewport-safe layout for mobile browsers.
- Explicitly calls `video.play()` with muted + playsinline for Chrome autoplay.
- If Chrome blocks autoplay, a PLAY INTRO button appears.
- SKIP INTRO always goes to `main.html`.
- `intro.mp4?v=2` helps prevent an older cached video response.
- The existing 01~05 and archive/functions content is preserved.

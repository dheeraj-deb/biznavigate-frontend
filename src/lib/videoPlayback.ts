// Only one autoplaying preview video at a time — hero + room cards would
// otherwise all try to play simultaneously and burn mobile bandwidth.
let current: HTMLVideoElement | null = null;

export function claimPlayback(video: HTMLVideoElement): void {
  if (current && current !== video) {
    current.pause();
  }
  current = video;
}

export function releasePlayback(video: HTMLVideoElement): void {
  if (current === video) current = null;
}

'use client';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import OptimizedImage from "../OptimizedImage";
import { classifyMedia } from "../../lib/media";
import { sp } from "./tokens";

type Props = {
  url: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  onPlay?: () => void;
  videoRef?: React.Ref<HTMLVideoElement>;
  sx?: object;
};

/**
 * Renders whatever media URL an owner supplied: a direct mp4/webm plays
 * inline; YouTube gets a lazy click-to-load facade (poster thumbnail, no
 * iframe cost until tapped); Instagram/TikTok embeds are fragile/blockable
 * so they always ship a "watch on X" fallback link.
 */
export function VideoEmbed({ url, poster, autoPlay, muted = true, loop, controls, onPlay, videoRef, sx }: Props) {
  const media = classifyMedia(url);
  const [loadedEmbed, setLoadedEmbed] = useState(false);

  if (media.kind === "mp4") {
    return (
      <Box
        component="video"
        ref={videoRef}
        src={media.url}
        poster={poster}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        onPlay={onPlay}
        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...sx }}
      />
    );
  }

  if (media.kind === "youtube") {
    if (!loadedEmbed) {
      return (
        <Box
          onClick={() => {
            setLoadedEmbed(true);
            onPlay?.();
          }}
          sx={{ position: "relative", width: "100%", height: "100%", cursor: "pointer", bgcolor: "#000", ...sx }}
        >
          {media.thumbnail && (
            <OptimizedImage src={media.thumbnail} alt="Video preview" sx={{ width: "100%", height: "100%" }} />
          )}
          <PlayBadge />
        </Box>
      );
    }
    return (
      <Box
        component="iframe"
        src={media.embedUrl}
        title="Video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        sx={{ width: "100%", height: "100%", border: 0, ...sx }}
      />
    );
  }

  if (media.kind === "instagram" || media.kind === "tiktok") {
    if (!loadedEmbed && media.embedUrl) {
      return (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            bgcolor: sp.bgSoft,
            ...sx,
          }}
        >
          <IconButton
            onClick={() => {
              setLoadedEmbed(true);
              onPlay?.();
            }}
            sx={{ bgcolor: sp.blue, color: "#fff", "&:hover": { bgcolor: "#1a4ab8" } }}
          >
            <PlayArrowIcon />
          </IconButton>
          <Link href={media.url} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontSize: "0.75rem", display: "inline-flex", alignItems: "center", gap: 0.5, color: sp.muted }}>
            Watch on {media.kind === "instagram" ? "Instagram" : "TikTok"}
            <OpenInNewIcon sx={{ fontSize: 12 }} />
          </Link>
        </Box>
      );
    }
    if (media.embedUrl) {
      return (
        <Box
          component="iframe"
          src={media.embedUrl}
          title="Video"
          allowFullScreen
          sx={{ width: "100%", height: "100%", border: 0, ...sx }}
        />
      );
    }
  }

  // TikTok (no reliable oEmbed URL pattern) or unrecognized — link out only.
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", bgcolor: sp.bgSoft, ...sx }}>
      <Link href={url} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontSize: "0.8125rem", color: sp.blue }}>
        Watch video <OpenInNewIcon sx={{ fontSize: 12, verticalAlign: "middle" }} />
      </Link>
    </Box>
  );
}

function PlayBadge() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: "rgba(0,0,0,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PlayArrowIcon sx={{ fontSize: 28, color: "#fff" }} />
      </Box>
    </Box>
  );
}

export function isDirectVideo(url: string): boolean {
  return classifyMedia(url).kind === "mp4";
}

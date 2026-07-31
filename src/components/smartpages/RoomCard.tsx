import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import OptimizedImage from "../OptimizedImage";
import type { PublicRoomType } from "../../lib/publicApi";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { VideoEmbed, isDirectVideo } from "./VideoEmbed";
import { trackListingClick } from "../../lib/attribution";
import { claimPlayback, releasePlayback } from "../../lib/videoPlayback";
import { sp, formatINR } from "./tokens";

type Props = {
  room: PublicRoomType;
  phoneNumber: string | null;
  propertyName: string;
  propertyId?: string;
  bookingSlug?: string;
  /** AI-generated room tour (direct mp4) — used when the owner hasn't uploaded a video. */
  tourUrl?: string | null;
};

export function RoomCard({ room, phoneNumber, propertyName, propertyId, bookingSlug, tourUrl }: Props) {
  const photos = room.photos ?? [];
  const roomVideo = (room.videos ?? []).find(isDirectVideo) ?? tourUrl ?? undefined;
  const [index, setIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function startPreview() {
    if (!roomVideo) return;
    setPlayingVideo(true);
    trackListingClick({ propertyId, roomTypeId: room.id, action: "video_play" });
  }

  function stopPreview() {
    setPlayingVideo(false);
    if (videoRef.current) releasePlayback(videoRef.current);
  }

  function handleVideoMounted(video: HTMLVideoElement | null) {
    if (!video) return;
    claimPlayback(video);
    video.play().catch(() => {});
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        borderRadius: sp.radius,
        border: `1px solid ${sp.border}`,
        bgcolor: "#fff",
        p: 2.5,
        boxShadow: sp.cardShadow,
      }}
    >
      {(photos.length > 0 || roomVideo) && (
        <Box
          onMouseEnter={startPreview}
          onMouseLeave={stopPreview}
          onClick={() => (playingVideo ? stopPreview() : roomVideo && startPreview())}
          sx={{
            position: "relative",
            height: { xs: 176, sm: 144 },
            width: { xs: "100%", sm: 192 },
            flexShrink: 0,
            borderRadius: sp.radiusSm,
            bgcolor: sp.border,
            overflow: "hidden",
            cursor: roomVideo ? "pointer" : "default",
          }}
        >
          {playingVideo && roomVideo ? (
            <VideoEmbed
              url={roomVideo}
              poster={photos[0]}
              muted
              loop
              videoRef={(el) => {
                videoRef.current = el;
                handleVideoMounted(el);
              }}
            />
          ) : photos.length > 0 ? (
            <OptimizedImage src={photos[index]} alt={room.name} sx={{ width: "100%", height: "100%" }} />
          ) : null}

          {roomVideo && !playingVideo && (
            <Box sx={{ position: "absolute", right: 6, bottom: 6, color: "#fff", filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}>
              <PlayCircleOutlineIcon sx={{ fontSize: 22 }} />
            </Box>
          )}

          {photos.length > 1 && !playingVideo && (
            <>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => (i - 1 + photos.length) % photos.length);
                }}
                sx={{ position: "absolute", left: 4, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.35)", color: "#fff", p: 0.5, "&:hover": { bgcolor: "rgba(0,0,0,0.55)" } }}
              >
                <ChevronLeftIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => (i + 1) % photos.length);
                }}
                sx={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.35)", color: "#fff", p: 0.5, "&:hover": { bgcolor: "rgba(0,0,0,0.55)" } }}
              >
                <ChevronRightIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <Box sx={{ position: "absolute", bottom: 6, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 0.5 }}>
                {photos.map((_, i) => (
                  <Box key={i} sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: i === index ? "#fff" : "rgba(255,255,255,0.5)" }} />
                ))}
              </Box>
            </>
          )}
        </Box>
      )}
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", gap: 1.5 }}>
        <Box>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: sp.ink }}>
            {room.name}
          </Typography>
          {room.description && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: "0.875rem",
                lineHeight: 1.4,
                color: "#657792",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {room.description}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, color: sp.muted }}>
          <Typography sx={{ fontSize: "0.75rem", display: "inline-flex", alignItems: "center", gap: 0.5 }}>
            <PeopleOutlineIcon sx={{ fontSize: 15 }} />
            Up to {room.capacityAdults} adults
            {room.capacityChildren > 0 ? ` + ${room.capacityChildren} children` : ""}
          </Typography>
          {room.totalRooms > 1 && (
            <Typography sx={{ fontSize: "0.75rem" }}>{room.totalRooms} rooms available</Typography>
          )}
        </Box>

        {room.amenities?.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {room.amenities.slice(0, 4).map((a) => (
              <Chip
                key={a}
                label={a}
                size="small"
                sx={{
                  borderRadius: "8px",
                  bgcolor: sp.chipBg,
                  color: sp.chipText,
                  fontSize: "0.6875rem",
                  height: 24,
                }}
              />
            ))}
          </Box>
        )}

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            borderTop: "1px solid #f0f4fa",
            pt: 1.5,
          }}
        >
          <Box>
            <Typography component="span" sx={{ fontSize: "1.125rem", fontWeight: 700, color: sp.ink }}>
              ₹{formatINR(Number(room.basePrice))}
            </Typography>
            <Typography component="span" sx={{ fontSize: "0.875rem", color: sp.muted }}>
              /night
            </Typography>
          </Box>
          <WhatsAppCTA
            phoneNumber={phoneNumber}
            propertyName={propertyName}
            roomName={room.name}
            propertyId={propertyId}
            roomTypeId={room.id}
            bookingSlug={bookingSlug}
            label="Book now"
          />
        </Box>
      </Box>
    </Box>
  );
}

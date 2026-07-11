import React, { useState } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import OptimizedImage from "../OptimizedImage";
import { VideoEmbed } from "./VideoEmbed";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { trackListingClick } from "../../lib/attribution";
import type { PageMoment } from "../../lib/publicApi";
import { sp } from "./tokens";

type Props = {
  moment: PageMoment;
  phoneNumber: string | null;
  propertyName: string;
  propertyId?: string;
  /** Renders the clickable trigger element; receives the click handler to attach. */
  trigger: (onClick: (e: React.MouseEvent<HTMLElement>) => void) => React.ReactNode;
};

/** Shared media popover (desktop) / bottom sheet (mobile) used by both MomentPin and AmenityHighlights. */
export function MomentPopover({ moment, phoneNumber, propertyName, propertyId, trigger }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMobile = useMediaQuery("(max-width:599px)");
  const open = Boolean(anchorEl);

  function handleOpen(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    trackListingClick({ propertyId, roomTypeId: moment.roomTypeId ?? undefined, action: `moment_click:${moment.id}` });
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const content = (
    <Box sx={{ width: { xs: "100%", sm: 280 }, p: 2 }}>
      {moment.mediaUrl && (
        <Box sx={{ position: "relative", aspectRatio: "16/10", borderRadius: sp.radiusSm, overflow: "hidden", mb: 1.5, bgcolor: sp.border }}>
          {/^https?:\/\/.*\.(mp4|webm)/i.test(moment.mediaUrl) || /youtube|instagram|tiktok/i.test(moment.mediaUrl) ? (
            <VideoEmbed url={moment.mediaUrl} muted loop />
          ) : (
            <OptimizedImage src={moment.mediaUrl} alt={moment.label} sx={{ width: "100%", height: "100%" }} />
          )}
        </Box>
      )}
      <Typography sx={{ fontSize: "0.9375rem", fontWeight: 700, color: sp.ink }}>{moment.label}</Typography>
      {moment.description && (
        <Typography sx={{ mt: 0.5, fontSize: "0.8125rem", lineHeight: 1.5, color: sp.body }}>
          {moment.description}
        </Typography>
      )}
      <Box sx={{ mt: 1.5 }}>
        <WhatsAppCTA
          phoneNumber={phoneNumber}
          propertyName={propertyName}
          propertyId={propertyId}
          roomTypeId={moment.roomTypeId ?? undefined}
          intentContext={moment.label}
          label={moment.ctaText || "Ask on WhatsApp"}
          fullWidth
        />
      </Box>
    </Box>
  );

  return (
    <>
      {trigger(handleOpen)}

      {isMobile ? (
        <Drawer anchor="bottom" open={open} onClose={handleClose} slotProps={{ paper: { sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } } }}>
          {content}
        </Drawer>
      ) : (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "center", horizontal: "right" }}
          transformOrigin={{ vertical: "center", horizontal: "left" }}
          slotProps={{ paper: { sx: { borderRadius: sp.radiusSm, ml: 1 } } }}
        >
          {content}
        </Popover>
      )}
    </>
  );
}

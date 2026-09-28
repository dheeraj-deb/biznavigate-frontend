'use client';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { submitReview, type PublicReview } from "../../lib/publicApi";
import { revalidateResort } from "../../lib/revalidate-resort";
import { SectionTitle } from "./DetailSections";
import { sp } from "./tokens";
import { guestDisplayFontFamily } from "../../lib/guestTheme";

type Props = {
  slug: string;
  reviews: PublicReview[];
  averageRating: number;
  reviewCount: number;
};

const ratingSx = { color: sp.star, "& .MuiRating-iconEmpty": { color: sp.starEmpty } };

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: sp.radiusSm,
    bgcolor: "#fff",
    fontSize: "0.9375rem",
    "& fieldset": { borderColor: sp.borderSoft },
    "&.Mui-focused fieldset": { borderColor: sp.ink, borderWidth: 1 },
  },
};

const fieldLabelSx = { mb: 0.75, fontSize: "0.8125rem", fontWeight: 600, color: sp.ink } as const;

const outlinePillSx = {
  height: 44,
  px: 2.5,
  borderRadius: 999,
  border: `1px solid ${sp.ink}`,
  color: sp.ink,
  fontSize: "0.875rem",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": { bgcolor: sp.bgSoft },
} as const;

/** "2026-09-12T…" → "September 2026" — the month a guest stayed is what matters, not the day. */
function reviewMonth(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function ReviewSection({ slug, reviews: serverReviews, averageRating: serverAverage, reviewCount: serverCount }: Props) {
  // Reviews are published on submit (PublicReview.isApproved defaults true),
  // so the guest's own is shown straight away — the server copy of this page
  // is cached and only catches up once revalidateResort has run.
  const [posted, setPosted] = useState<PublicReview[]>([]);
  const reviews = [...posted, ...serverReviews];
  const reviewCount = serverCount + posted.length;
  const averageRating =
    reviewCount > 0
      ? Math.round(((serverAverage * serverCount + posted.reduce((sum, r) => sum + r.rating, 0)) / reviewCount) * 10) / 10
      : 0;
  const [showForm, setShowForm] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!guestName.trim()) {
      setError("Please enter your name.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const review = { guestName: guestName.trim(), rating, comment: comment.trim() || undefined };
      await submitReview(slug, review);
      setPosted((prev) => [
        { id: `posted-${Date.now()}`, ...review, comment: review.comment ?? null, createdAt: new Date().toISOString() },
        ...prev,
      ]);
      void revalidateResort(slug).catch(() => {
        /* the cache still expires on its own within CATALOGUE_TTL */
      });
      setSubmitted(true);
      setShowForm(false);
    } catch {
      setError("Couldn't submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const writeReviewButton = submitted ? (
    <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: sp.whatsappText }}>
      Thanks for sharing your stay!
    </Typography>
  ) : !showForm ? (
    <Button onClick={() => setShowForm(true)} startIcon={<RateReviewOutlinedIcon />} sx={outlinePillSx}>
      Write a review
    </Button>
  ) : null;

  return (
    <Box component="section" sx={{ mt: 6 }}>
      <SectionTitle>Guest reviews</SectionTitle>

      {reviewCount > 0 ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontFamily: guestDisplayFontFamily, fontSize: "3rem", fontWeight: 400, color: sp.ink, lineHeight: 1 }}>
              {averageRating.toFixed(1)}
            </Typography>
            <Box>
              <Rating value={averageRating} precision={0.5} readOnly size="small" sx={ratingSx} />
              <Typography sx={{ fontSize: "0.8125rem", color: sp.muted }}>
                from {reviewCount} guest review{reviewCount !== 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>

          {/* Swipe on phones (the next card peeks in), a grid on wider screens. */}
          <Box
            sx={{
              mt: 2.5,
              mx: { xs: -2, sm: 0 },
              px: { xs: 2, sm: 0 },
              display: { xs: "flex", sm: "grid" },
              gridTemplateColumns: { sm: "1fr 1fr" },
              gap: 1.5,
              overflowX: { xs: "auto", sm: "visible" },
              scrollSnapType: { xs: "x mandatory", sm: "none" },
              scrollPaddingLeft: 16,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {reviews.slice(0, 8).map((r) => (
              <Box
                key={r.id}
                component="article"
                sx={{
                  // One review has nothing to swipe to — it takes the full width.
                  flex: { xs: reviews.length > 1 ? "0 0 84%" : "0 0 100%", sm: "initial" },
                  scrollSnapAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  border: `1px solid ${sp.border}`,
                  bgcolor: "#fff",
                  p: 2.25,
                }}
              >
                <Rating value={r.rating} readOnly size="small" sx={ratingSx} />
                {r.comment && (
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                      color: sp.body,
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {r.comment}
                  </Typography>
                )}
                <Box sx={{ mt: "auto", pt: 1.75, display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: sp.ink,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                    }}
                  >
                    {r.guestName.trim().charAt(0).toUpperCase()}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {r.guestName}
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: sp.muted }}>{reviewMonth(r.createdAt)}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 2.5 }}>{writeReviewButton}</Box>
        </>
      ) : (
        !showForm && (
          <Box sx={{ borderRadius: "20px", border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft, px: 2.5, py: 3 }}>
            <Rating
              value={0}
              readOnly
              sx={{ fontSize: "1.375rem", "& .MuiRating-iconEmpty": { color: sp.star, opacity: 0.55 } }}
              emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
            />
            <Typography sx={{ mt: 1, fontFamily: guestDisplayFontFamily, fontSize: "1.375rem", lineHeight: 1.2, color: sp.ink }}>
              No reviews yet
            </Typography>
            <Typography sx={{ mt: 0.75, mb: 2, fontSize: "0.9375rem", lineHeight: 1.6, color: sp.body }}>
              Stayed here? A few words from you help the next guest decide.
            </Typography>
            {writeReviewButton}
          </Box>
        )
      )}

      {showForm && !submitted && (
        <Box sx={{ mt: reviewCount > 0 ? 2 : 0, borderRadius: "20px", border: `1px solid ${sp.border}`, bgcolor: "#fff", p: 2.5 }}>
          <Typography sx={{ fontFamily: guestDisplayFontFamily, fontSize: "1.375rem", color: sp.ink }}>How was your stay?</Typography>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography sx={fieldLabelSx}>Your rating</Typography>
              <Rating
                value={rating}
                onChange={(_, v) => setRating(v ?? 5)}
                size="large"
                sx={ratingSx}
                emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
              />
            </Box>
            <Box>
              <Typography sx={fieldLabelSx}>Your name</Typography>
              <TextField
                fullWidth
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Anita Sharma"
                sx={inputSx}
              />
            </Box>
            <Box>
              <Typography sx={fieldLabelSx}>Your stay (optional)</Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you love? What should the next guest know?"
                sx={inputSx}
              />
            </Box>
            {error && <Typography sx={{ fontSize: "0.875rem", color: "#dc2626" }}>{error}</Typography>}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Button
                onClick={() => void handleSubmit()}
                disabled={submitting}
                disableElevation
                startIcon={submitting ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : undefined}
                sx={{
                  height: 46,
                  px: 3,
                  borderRadius: 999,
                  bgcolor: sp.blue,
                  color: "#fff",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#1a4ab8" },
                  "&.Mui-disabled": { bgcolor: sp.blue, color: "#fff", opacity: 0.5 },
                }}
              >
                Submit review
              </Button>
              <Button onClick={() => setShowForm(false)} sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.muted, textTransform: "none" }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

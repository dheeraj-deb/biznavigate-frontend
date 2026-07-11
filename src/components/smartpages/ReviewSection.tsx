import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { submitReview, type PublicReview } from "../../lib/publicApi";
import { sp } from "./tokens";

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
    fontSize: "0.875rem",
    "& fieldset": { borderColor: sp.borderSoft },
  },
};

export function ReviewSection({ slug, reviews, averageRating, reviewCount }: Props) {
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
      await submitReview(slug, { guestName: guestName.trim(), rating, comment: comment.trim() || undefined });
      setSubmitted(true);
      setShowForm(false);
    } catch {
      setError("Couldn't submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box component="section" sx={{ mt: 5 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
        <Typography component="h2" sx={{ fontSize: "1.25rem", fontWeight: 700, color: sp.ink }}>
          Guest reviews
        </Typography>
        {reviewCount > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={averageRating} precision={0.5} readOnly size="small" sx={ratingSx} />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink }}>
              {averageRating.toFixed(1)}
            </Typography>
            <Typography sx={{ fontSize: "0.875rem", color: sp.muted }}>
              · {reviewCount} review{reviewCount !== 1 ? "s" : ""}
            </Typography>
          </Box>
        )}
      </Box>

      {reviews.length === 0 ? (
        <Typography sx={{ mt: 1.5, fontSize: "0.875rem", color: sp.muted }}>
          No reviews yet — be the first to share your stay.
        </Typography>
      ) : (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {reviews.slice(0, 8).map((r) => (
            <Box key={r.id} sx={{ borderRadius: sp.radiusSm, border: `1px solid ${sp.border}`, bgcolor: "#fff", p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink }}>
                  {r.guestName}
                </Typography>
                <Rating value={r.rating} readOnly size="small" sx={ratingSx} />
              </Box>
              {r.comment && (
                <Typography sx={{ mt: 0.75, fontSize: "0.875rem", lineHeight: 1.7, color: sp.body }}>
                  {r.comment}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {submitted ? (
        <Typography sx={{ mt: 2, fontSize: "0.875rem", fontWeight: 500, color: sp.whatsappText }}>
          Thanks for sharing your stay!
        </Typography>
      ) : showForm ? (
        <Box sx={{ mt: 2, borderRadius: sp.radiusSm, border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft, p: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box>
              <Typography sx={{ mb: 0.75, fontSize: "0.75rem", fontWeight: 500, color: sp.muted }}>
                Your name
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Anita Sharma"
                sx={inputSx}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.75, fontSize: "0.75rem", fontWeight: 500, color: sp.muted }}>
                Rating
              </Typography>
              <Rating
                value={rating}
                onChange={(_, v) => setRating(v ?? 5)}
                size="medium"
                sx={ratingSx}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.75, fontSize: "0.75rem", fontWeight: 500, color: sp.muted }}>
                Your stay (optional)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What was your stay like?"
                sx={inputSx}
              />
            </Box>
            {error && <Typography sx={{ fontSize: "0.875rem", color: "#dc2626" }}>{error}</Typography>}
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                onClick={() => void handleSubmit()}
                disabled={submitting}
                disableElevation
                startIcon={submitting ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : undefined}
                sx={{
                  height: 40,
                  px: 2.5,
                  borderRadius: sp.radiusSm,
                  bgcolor: sp.blue,
                  color: "#fff",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#1a4ab8" },
                  "&.Mui-disabled": { bgcolor: sp.blue, color: "#fff", opacity: 0.5 },
                }}
              >
                Submit review
              </Button>
              <Button onClick={() => setShowForm(false)} sx={{ fontSize: "0.875rem", fontWeight: 500, color: sp.muted }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Button
          onClick={() => setShowForm(true)}
          sx={{
            mt: 2,
            height: 40,
            px: 2.5,
            borderRadius: sp.radiusSm,
            border: `1px solid ${sp.borderSoft}`,
            color: sp.blue,
            fontSize: "0.875rem",
            fontWeight: 600,
            "&:hover": { bgcolor: sp.blueBgTint },
          }}
        >
          Write a review
        </Button>
      )}
    </Box>
  );
}

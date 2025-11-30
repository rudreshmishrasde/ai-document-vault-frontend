import { useEffect, useState } from "react"
import { Box, Paper, Stack, Typography } from "@mui/material"
import { useDocumentStore } from "../../store/documentStore"
import { baseUrl } from "../../env.const"
import { useIsMobile } from "../../hooks/useMediaQuery"

export const PdfViewer = () => {
  const { currentDocument } = useDocumentStore()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  useEffect(() => {
    if (currentDocument?.id) {
      setPreviewUrl(`${baseUrl}/api/documents/${currentDocument.id}/file`)
    } else {
      setPreviewUrl(null)
    }
  }, [currentDocument])

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        borderRadius: 3,
        bgcolor: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.25)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          borderRadius: 2,
          border: "1px solid rgba(148,163,184,0.35)",
          overflow: "hidden",
          bgcolor: "black",
        }}
      >
        {previewUrl ? (
          <iframe
            title="PDF preview"
            src={previewUrl}
            style={{ width: "100%", height: isMobile ? "50vh"  : "100%" , border: "none" }}
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%", color: "grey.500" }}
          >
            <Typography variant="body1">No File selected</Typography>
          </Stack>
        )}
      </Box>
    </Paper>
  )
}

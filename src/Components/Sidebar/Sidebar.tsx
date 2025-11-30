import { useEffect, useMemo } from "react"
import { formatDistanceToNow } from "date-fns"
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import { deleteDocument, getALlDocuments } from "../../services/api"
import { UploadDocument } from "../UploadDocument"
import { useDocumentStore } from "../../store/documentStore"
import type { IDocumentRecord } from "../../Interface"

export const Sidebar = () => {
    const { documents, loading, setDocuments, setLoading, removeDocument, setCurrentDocument } = useDocumentStore()

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true)
            try {
                const response = await getALlDocuments()
                setDocuments(response?.data ?? [])
            } catch (error) {
                console.error("Failed to fetch documents", error)
            } finally {
                setLoading(false)
            }
        }
        fetchDocuments()
    }, [setDocuments, setLoading])

    const fallbackSkeletons = useMemo(() => Array.from({ length: 4 }), [])
    const handleDeleteDocument = async (document: IDocumentRecord) => {
        try {
            await deleteDocument(document?.id)
            removeDocument(document.id)
            setCurrentDocument(null)
        } catch {
            //
        }
    }
    const renderList = () => {
        if (loading) {
            return fallbackSkeletons.map((_, index) => (
                <ListItem key={`skeleton-${index}`}>
                    <ListItemAvatar>
                        <Skeleton variant="circular" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Skeleton width="80%" />}
                        secondary={<Skeleton width="40%" />}
                    />
                </ListItem>
            ))
        }

        if (documents.length === 0) {
            return (
                <Stack alignItems="center" spacing={1} py={3}>
                    <Typography variant="body1" color="grey.400">
                        You haven’t uploaded anything yet.
                    </Typography>
                    <Typography variant="body2" color="grey.500">
                        Start by dropping a file to see it here.
                    </Typography>
                </Stack>
            )
        }

        return documents.map((document) => {
            const fileExtension = document.original_filename
                ?.split(".")
                .pop()
                ?.toUpperCase()
            const relativeTime = document.created_at
                ? formatDistanceToNow(new Date(document.created_at), { addSuffix: true })
                : "Just now"

            return (
                <ListItem
                    key={document.id}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid rgba(148,163,184,0.2)",
                        mb: 1,
                        bgcolor: "rgba(15,23,42,0.6)",
                        width: "100%",
                        gap: 1,
                        cursor: "pointer",
                        "&:hover": {
                            bgcolor: "rgba(15,23,42,0.8)",
                        },
                    }}
                    onClick={() => setCurrentDocument(document)}
                >
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                bgcolor: "rgba(59,130,246,0.15)",
                                color: "#38bdf8",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                            }}
                        >
                            {fileExtension ?? "DOC"}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle2" color="common.white" noWrap fontWeight={600}>
                                {document.original_filename}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="caption" color="grey.400">
                                {relativeTime}
                            </Typography>
                        }
                        sx={{ mr: 1 }}
                    />
                    <IconButton
                        edge="end"
                        aria-label={`Delete ${document.original_filename}`}
                        sx={{
                            color: "#94a3b8",
                            "&:hover": { color: "#f87171" },
                        }}
                        onClick={() => handleDeleteDocument(document)}
                    >
                        <DeleteOutlineRoundedIcon />
                    </IconButton>
                </ListItem>
            )
        })
    }

    return (
        <Box sx={{ width: { xs: "100%", md: "30%" }, pr: { md: 3 }, minHeight: "90vh" }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "rgba(2,6,23,0.85)",
                    border: "1px solid rgba(148,163,184,0.2)",
                    minHeight: "100%",
                }}
            >
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="overline" color="grey.400" letterSpacing={2}>
                            Library
                        </Typography>
                        <Typography variant="h5" color="common.white" fontWeight={600}>
                            Your files
                        </Typography>
                        <Typography variant="body2" color="grey.500">
                            Recently processed documents are pinned here for quick access.
                        </Typography>
                    </Box>
                    <UploadDocument />
                    <Divider sx={{ borderColor: "rgba(148,163,184,0.2)" }} />
                    <Typography variant="body2" color="grey.500">
                        Uploaded Files
                    </Typography>
                    <List disablePadding sx={{ maxHeight: "70vh", overflowY: "auto" }}>
                        {renderList()}
                    </List>
                </Stack>
            </Paper>
        </Box>
    )
}
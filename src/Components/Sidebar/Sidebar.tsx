import { useEffect } from "react"
import {
    Box,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material"
import { getAllFolders } from "../../services/api"
import { FolderList } from "../FolderList"
import { useDocumentStore } from "../../store/documentStore"

export const Sidebar = () => {
    const { 
        setFolders,
        setLoading, 
    } = useDocumentStore()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const foldersResponse = await getAllFolders()
                setFolders(foldersResponse?.data ?? [])
            } catch (error) {
                console.error("Failed to fetch data", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

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
                    <Divider sx={{ borderColor: "rgba(148,163,184,0.2)" }} />
                    <FolderList />
                </Stack>
            </Paper>
        </Box>
    )
}
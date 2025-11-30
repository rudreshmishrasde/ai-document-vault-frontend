import { useState, useCallback } from "react"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import { uploadFolderDocuments } from "../../services/api"
import "./uploadDocument.css"
import { useDocumentStore } from "../../store/documentStore"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Typography,
    Box,
    IconButton,
} from "@mui/material"

export const UploadDocument = ({ id = "inputTag", folderId , setDocuments  }: { id?: string; folderId?: number | string  , setDocuments : React.Dispatch<React.SetStateAction<never[]>>}) => {
    const { setCurrentDocument } = useDocumentStore()
    const [loader, setLoader] = useState(false)

    const processFiles = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) return
        setLoader(true)
        const formData = new FormData()
        Array.from(files).forEach((file) => formData.append("files", file))
        try {
            const response = await uploadFolderDocuments(formData , folderId as number)
            console.log("response" , response)
            setDocuments(response?.data?.documents ?? [])
            setCurrentDocument(response?.data?.uploaded?.[0])
        } catch (error) {
            console.error("Failed to upload document", error)
        } finally {
            setLoader(false)
        }
    }, [setDocuments])

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            void processFiles(event.target.files)
            event.target.value = ""
        },
        [processFiles],
    )

    return (
        <>
            <Dialog open={loader}>
                <DialogTitle>Uploading Document</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
                        <CircularProgress />
                        <Typography variant="body2" color="grey.600">
                            Please wait while your document is being processed...
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
            <label
                htmlFor={id}
            >
                <IconButton
                    size="small"
                    component="span"
                    sx={{ color: "grey.400", "&:hover": { color: "#38bdf8" } }}
                >
                    <CreateNewFolderIcon fontSize="small" />
                </IconButton>
                <input
                    hidden
                    id={id}
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                    onChange={handleInputChange}
                />
            </label>
        </>
    )
}
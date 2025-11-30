import { useState, useCallback } from "react"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { uploadDocument } from "../../services/api"
import "./uploadDocument.css"
import { useDocumentStore } from "../../store/documentStore"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Typography,
    Box,
} from "@mui/material"

export const UploadDocument = () => {
    const { setDocuments , setCurrentDocument } = useDocumentStore()
    const [isDragging, setIsDragging] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [loader, setLoader] = useState(false)

    const processFiles = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) return
        setLoader(true)
        const formData = new FormData()
        Array.from(files).forEach((file) => formData.append("files", file))
        try {
            const response = await uploadDocument(formData)
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

    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLLabelElement>) => {
            event.preventDefault()
            setIsDragging(false)
            void processFiles(event.dataTransfer.files)
        },
        [processFiles],
    )

    const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        setIsDragging(false)
    }, [])

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
                htmlFor="inputTag"
                className={`upload-card ${isDragging ? "upload-card--active" : ""} ${hovered ? "upload-card--hover" : ""
                    }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="upload-card__icon">
                    <CloudUploadIcon fontSize="large" />
                </div>

                <div className="upload-card__text">
                    <p className="upload-card__title">
                        Drop new files here or <span>browse</span>
                    </p>
                </div>

                <div className="upload-card__cta">
                    <ArrowForwardIosIcon fontSize="small" />
                </div>

                <input
                    hidden
                    id="inputTag"
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                    onChange={handleInputChange}
                />
            </label>
        </>
    )
}
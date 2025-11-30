import {
    Box,
    Typography,
    Collapse,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
} from "@mui/material"
import FolderIcon from "@mui/icons-material/Folder"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import { UploadDocument } from "../UploadDocument"
import { useState } from "react"
import { deleteDocument, deleteFolder, getFolderFiles } from "../../services/api"
import { useDocumentStore } from "../../store/documentStore"
import { formatDistanceToNow } from "date-fns"
import type { IDocumentRecord } from "../../Interface"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"

interface FolderItemProps {
    folder: any // Replace 'any' with the correct interface if available, likely IFolder
    isSelected: boolean
    onFolderClick?: (id: number) => void
    index: number
}

export const FolderItem = ({ folder, isSelected, index }: FolderItemProps) => {
    const [documents, setDocuments] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const { 
        setCurrentDocument,
        setSelectedFolderIndex,
        setFolders
    } = useDocumentStore()
    const handleFolderClick = async () => {
        setSelectedFolderIndex(index)
        if (!isOpen) {
            try {
                const response = await getFolderFiles(folder.id)
                setDocuments(response?.data ?? [])
            } catch {
                // Handle error
            }
        }
        setIsOpen(!isOpen)
    }

    const renderList = () => {
       if(documents.length === 0) return <Typography variant="body2" color="grey.500">No documents found</Typography>   
        return documents.map((document : IDocumentRecord) => {
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

    const handleDeleteDocument = async (document: IDocumentRecord) => {
        try {
          const response =   await deleteDocument(document?.id)
          console.log("response" , response?.data?.documents)
            setDocuments(response?.data?.documents)
            setCurrentDocument(null)
        } catch {
            //
        }
    }

    const handleDeleteFolder = async () => {
        try {
           const response =  await deleteFolder(folder.id)
           setFolders(response?.data?.folders)
        } catch {
            //
        }
    }
    return (
        <Box sx={{ mb: 0.5 , display: "flex" , flexDirection : "column" , gap : 2}}>
            <Box
                onClick={handleFolderClick}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 1,
                    cursor: "pointer",
                    bgcolor: isSelected ? "rgba(59,130,246,0.15)" : "transparent",
                    "&:hover": {
                        bgcolor: isSelected ? "rgba(59,130,246,0.2)" : "rgba(255, 255, 255, 0.05)",
                    },
                    transition: "background-color 0.2s",
                    justifyContent: "space-between",
                    width: "100%"
                }}
            >
                <Box sx={{ minWidth: 36, display: "flex", alignItems: "center" }}>
                    {isOpen ? (
                        <FolderOpenIcon sx={{ color: "#38bdf8", fontSize: 20 }} />
                    ) : (
                        <FolderIcon sx={{ color: "grey.500", fontSize: 20 }} />
                    )}
                </Box>
                <Typography
                    variant="body2"
                    color="common.white"
                    fontWeight={isSelected ? 600 : 400}
                    sx={{ flexGrow: 1 }}
                >
                    {folder.name}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <UploadDocument id={`upload-folder-${folder.id}`} folderId={folder.id} setDocuments={setDocuments}/>
                    <IconButton 
                        size="small" 
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteFolder()
                        }}
                        sx={{ 
                            color: "info.main",
                            padding: 0.5,
                            "&:hover": { color: "error.main" }
                        }}
                    >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
               {renderList()}
            </Collapse>
        </Box>
    )
}


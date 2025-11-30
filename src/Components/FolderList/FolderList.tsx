import { useState } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import { createFolder } from "../../services/api"
import { useDocumentStore } from "../../store/documentStore"

import { FolderItem } from "./FolderItem"

export const FolderList = () => {
  const { folders, setFolders, selectedFolderId } = useDocumentStore()
  const [openDialog, setOpenDialog] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [creatingFolder, setCreatingFolder] = useState(false)
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return

    setCreatingFolder(true)
    try {
      const response = await createFolder({ name: newFolderName.trim() })
       folders.unshift(response?.data)
      setFolders(folders)
      setNewFolderName("")
      setOpenDialog(false)
    } catch (error) {
      console.error("Failed to create folder", error)
    } finally {
      setCreatingFolder(false)
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="grey.500">
          Folders
        </Typography>
        <IconButton
          size="small"
          onClick={() => setOpenDialog(true)}
          sx={{ color: "grey.400", "&:hover": { color: "#38bdf8" } }}
        >
          <CreateNewFolderIcon fontSize="small" />
        </IconButton>
      </Box>
      <List dense disablePadding>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
        </ListItem>
        {folders.map((folder, index) => {
          const isSelected = selectedFolderId === folder.id
          return (
            <FolderItem
              index={index}
              key={folder.id}
              folder={folder}
              isSelected={isSelected}
            />
          )
        })}
      </List>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: "white",
            border: "1px solid rgba(148,163,184,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ color: "black" }}>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            fullWidth
            variant="outlined"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !creatingFolder) {
                handleCreateFolder()
              }
            }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "grey.400" }}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateFolder}
            variant="contained"
            disabled={creatingFolder || !newFolderName.trim()}
            sx={{
              bgcolor: "#3b82f6",
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            {creatingFolder ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}


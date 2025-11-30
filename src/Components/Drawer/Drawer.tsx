import { Drawer as MuiDrawer, Box } from "@mui/material"

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  width?: number
}

export const Drawer = ({ open, onClose, children, width = 280 }: DrawerProps) => {
  return (
    <MuiDrawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: width,
          bgcolor: "rgba(2,6,23,0.95)",
          borderRight: "1px solid rgba(148,163,184,0.2)",
          paddingTop : "50px"
        },
      }}
    >
      <Box sx={{ height: "100%", overflow: "auto" }}>{children}</Box>
    </MuiDrawer>
  )
}


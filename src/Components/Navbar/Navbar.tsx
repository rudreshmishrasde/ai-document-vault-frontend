import { AppBar, Toolbar, Typography, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useIsMobile } from "../../hooks/useMediaQuery"

interface NavbarProps {
  onToggle?: () => void
  title?: string
}

export const Navbar = ({ onToggle, title = "AI Document Vault" }: NavbarProps) => {
  const isMobile = useIsMobile()
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "rgba(2,6,23,0.95)",
        borderBottom: "1px solid rgba(148,163,184,0.2)",
      }}
    >
      <Toolbar>
        {
          isMobile &&
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={onToggle}
            sx={{ mr: 2 }}
          >

            <MenuIcon />
          </IconButton>
        }

        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}


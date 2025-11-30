import { useState } from "react"
import { Box } from "@mui/material"
import { Navbar } from "../Navbar"
import { Drawer } from "../Drawer"
import FileComponent from "../FileComponent"
import { Sidebar } from "../Sidebar/Sidebar"
import { useIsMobile } from "../../hooks/useMediaQuery"

const MobileView = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isMobile = useIsMobile()
  const handleToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar onToggle={handleToggle} />
      <div style={{marginTop : "10px" , height: "calc(100vh - 10px)"}}>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} width={isMobile ? 320 : 520}>
          <Sidebar />
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: "64px",
            p: 2,
          }}
        >
          <FileComponent />
        </Box>
      </div>



    </Box>
  )
}

export default MobileView
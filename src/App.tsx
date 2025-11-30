import { Sidebar } from "./Components/Sidebar/Sidebar"
import FileComponent from "./Components/FileComponent"
import { useIsMobile } from "./hooks/useMediaQuery"
import MobileView from "./Components/MobileView"
import WebView from "./Components/WebView"

function App() {
  const isMobile = useIsMobile()

  return (
   <>
   {isMobile ? <MobileView /> : <WebView />}
   </>
  )
}

export default App

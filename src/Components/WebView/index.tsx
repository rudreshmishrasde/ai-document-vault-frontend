import FileComponent from "../FileComponent"
import { Navbar } from "../Navbar"
import { Sidebar } from "../Sidebar/Sidebar"

const WebView = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%"  , gap: "16px",}}>
            <Navbar />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "16px",
                    padding: "16px",
                    height: "calc(100vh - 60px)",
                    boxSizing: "border-box",
                    width: "100%",
                    marginTop: "60px"
                }}
            >
                <Sidebar />
                <FileComponent />
            </div>
        </div>

    )
}

export default WebView
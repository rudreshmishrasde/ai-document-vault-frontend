import { useState } from "react"
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
import { useDocumentStore } from "../../store/documentStore"
import "./fileComponent.css"
import { PdfViewer } from "../PdfViewer"

const FileComponent = () => {
    const { currentDocument } = useDocumentStore()
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        {
            name: "File",
            value: "file",
            component: <PdfViewer />,
        },
        {
            name: "Summary",
            value: "summary",
            component: (
                <Paper
                    variant="outlined"
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        borderColor: "rgba(59,130,246,0.4)",
                        bgcolor: "rgba(15,23,42,0.8)",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="subtitle2" color="common.white" mb={2} fontWeight={600}>
                        AI Summary
                    </Typography>
                    <Typography variant="body2" color="grey.200" sx={{ whiteSpace: "pre-wrap" }}>
                        {currentDocument?.summary || "No summary available for this document."}
                    </Typography>
                </Paper>
            ),
        },
        {
            name: "Markdown",
            value: "markdown",
            component: (
                <Paper
                    variant="outlined"
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        borderColor: "rgba(148,163,184,0.2)",
                        bgcolor: "rgba(2,6,23,0.8)",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="subtitle2" color="common.white" mb={2} fontWeight={600}>
                        Markdown View
                    </Typography>
                    <Box className="markdown-content">
                        <ReactMarkdown>
                            {currentDocument?.summary
                                ? `# ${currentDocument.original_filename}\n\n${currentDocument.summary}`
                                : "No markdown content available."}
                        </ReactMarkdown>
                    </Box>
                </Paper>
            ),
        },
    ]

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <Paper
            elevation={0}
            sx={{
                flex: 1,
                borderRadius: 3,
                bgcolor: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.25)",
                p: 3,
                minHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Box>
                <Typography variant="overline" color="grey.400" letterSpacing={2}>
                    Document View
                </Typography>
                <Typography
                  variant="h5"
                  color="common.white"
                  fontWeight={600}
                  sx={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {currentDocument?.original_filename || "No document selected"}
                </Typography>
            </Box>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    borderBottom: "1px solid rgba(148,163,184,0.2)",
                    "& .MuiTabs-indicator": {
                        backgroundColor: "#38bdf8",
                        height: 2,
                    },
                }}
            >
                {tabs.map((tab) => (
                    <Tab
                        key={tab.value}
                        label={tab.name}
                        sx={{
                            textTransform: "none",
                            color: "grey.400",
                            fontWeight: 500,
                            fontSize: "0.95rem",
                            minHeight: 48,
                            "&.Mui-selected": {
                                color: "#38bdf8",
                                fontWeight: 600,
                            },
                            "&:hover": {
                                color: "grey.200",
                            },
                        }}
                    />
                ))}
            </Tabs>

            <Box sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {tabs[activeTab]?.component}
            </Box>
        </Paper>
    )
}

export default FileComponent
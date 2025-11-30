# AI Document Vault - Frontend

A modern React-based document management system with AI-powered document processing, built with TypeScript, Material-UI, and Vite.

## Features

- 📁 **Folder Management**: Create, delete, and organize documents into folders
- 🤖 **AI Integration**: Automatic document summarization and markdown conversion
- 📱 **Responsive Design**: Mobile-first design with drawer navigation
- 📄 **PDF Viewer**: Built-in PDF viewer with responsive iframe rendering
- 🎨 **Modern UI**: Clean, intuitive interface using Material-UI

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:4000` (or configure via environment variables)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:4000
```

If not set, the app defaults to `http://localhost:4000`.

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Architecture & Design Choices

### Component Structure

The application follows a component-based architecture with clear separation of concerns:

```
src/
├── Components/          # Reusable UI components
│   ├── Drawer/         # Mobile drawer component
│   ├── FileComponent/  # Main document viewer with tabs
│   ├── FolderList/     # Folder management and drag-and-drop
│   ├── MobileView/     # Mobile-specific layout
│   ├── Navbar/         # Top navigation bar
│   ├── PdfViewer/      # PDF rendering component
│   ├── Sidebar/        # Document list sidebar
│   ├── UploadDocument/ # File upload component
│   └── WebView/        # Desktop-specific layout
├── hooks/              # Custom React hooks
│   └── useMediaQuery.ts # Responsive breakpoint detection
├── services/           # API service layer
│   └── api.ts          # HTTP client for backend communication
├── store/              # State management
│   └── documentStore.ts # Zustand store for global state
└── Interface/          # TypeScript type definitions
```

### State Management

**Zustand Store**: Centralized state management using Zustand for:
- Document list and metadata
- Folder structure and navigation
- Current selected document
- Loading states
- Document operations (add, remove, update)

This approach provides:
- Simple, lightweight state management
- No prop drilling
- Easy to test and maintain
- Type-safe with TypeScript

### Responsive Design

**Mobile-First Approach**:
- Uses Material-UI's `useMediaQuery` hook for breakpoint detection
- Separate `MobileView` and `WebView` components for optimized layouts
- Drawer navigation on mobile, permanent sidebar on desktop
- Responsive PDF viewer that adapts to screen size

**Breakpoints**:
- Mobile: `< 960px` (md breakpoint)
- Desktop: `≥ 960px`

### Component Design Patterns

1. **Container/Presentational Pattern**: 
   - Smart components (MobileView, WebView) handle logic
   - Presentational components (Navbar, Drawer) focus on UI

2. **Composition over Configuration**:
   - Reusable components (Drawer, Navbar) accept props for flexibility
   - Components can be easily extended or modified

3. **Custom Hooks**:
   - `useMediaQuery`: Encapsulates responsive logic
   - Reduces code duplication and improves testability

### API Integration

- **Centralized API Client**: All API calls go through `services/api.ts`
- **Environment-based Configuration**: API base URL configurable via environment variables
- **Error Handling**: Consistent error handling across API calls
- **Type Safety**: TypeScript interfaces ensure type-safe API responses

### UI/UX Decisions

1. **Material-UI**: Chosen for:
   - Comprehensive component library
   - Built-in accessibility features
   - Consistent design system
   - Responsive utilities

2. **Dark Theme**: Modern dark theme for better focus and reduced eye strain

3. **Tabbed Interface**: FileComponent uses tabs for:
   - File preview (PDF viewer)
   - AI Summary
   - Markdown view
   - Clean organization of related content

5. **Folder System**:
   - Hierarchical organization
   - Accordion-style folder expansion

## Technology Stack

- **React 19**: Latest React with modern hooks
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and dev server
- **Material-UI (MUI)**: Component library and styling
- **Zustand**: Lightweight state management
- **Axios**: HTTP client for API requests
- **React Markdown**: Markdown rendering
- **date-fns**: Date formatting utilities

## Project Structure Highlights

- **Modular Components**: Each feature is self-contained in its own directory
- **Type Safety**: Comprehensive TypeScript types in `Interface/` directory
- **Reusable Hooks**: Custom hooks for common patterns
- **Service Layer**: Separation of API logic from components
- **Store Pattern**: Centralized state management

## Development Notes

- The app expects a backend API at the configured `VITE_API_BASE_URL`
- PDF viewing uses iframe rendering (works best with PDF files)
- Mobile drawer automatically closes on document selection (can be customized)
- All API endpoints are defined in `src/services/api.ts`


import { create } from 'zustand'
import type { IDocumentRecord } from '../Interface'

interface DocumentStore {
  documents: IDocumentRecord[]
  loading: boolean
  selectedDocumentId: number | null
  selectedFolderId: number | string | null
  setDocuments: (documents: IDocumentRecord[]) => void
  addDocument: (document: IDocumentRecord) => void
  removeDocument: (id: number) => void
  setLoading: (loading: boolean) => void
  setSelectedDocumentId: (id: number | null) => void
  setSelectedFolderId: (folderId: number | string | null) => void
  currentDocument : IDocumentRecord | null
  setCurrentDocument: (document: IDocumentRecord | null) => void
  folders: any[]
  setFolders: (folders: any[]) => void
  selectedFolderIndex: number
  setSelectedFolderIndex: (folderIndex: number) => void
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  loading: false,
  selectedDocumentId: null,
  selectedFolderId: 0,
  selectedFolderIndex: 0,
  setSelectedFolderIndex: (folderIndex: number) => set({ selectedFolderIndex: folderIndex }),
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) =>
    set((state) => ({
      documents: [document, ...state.documents],
    })),
  removeDocument: (id) =>
    set((state) => {
        const newFolders = [...state.folders]
        // Check if selectedFolderIndex is valid
        if (state.selectedFolderIndex >= 0 && state.selectedFolderIndex < newFolders.length) {
             const folder = newFolders[state.selectedFolderIndex]
             if(folder.documents){
                 folder.documents = folder.documents.filter((doc: IDocumentRecord) => doc.id !== id)
             }
        }
        return {
             folders: newFolders,
             documents: state.documents.filter((doc) => doc.id !== id)
        }
    }),
  setLoading: (loading) => set({ loading }),
  setSelectedDocumentId: (id) => set({ selectedDocumentId: id }),
  setSelectedFolderId: (folderId) => set({ selectedFolderId: folderId }),
  currentDocument : null,
  setCurrentDocument: (document) => set({ currentDocument: document }),
  folders: [],
  setFolders: (folders) => set({ folders }),
}))


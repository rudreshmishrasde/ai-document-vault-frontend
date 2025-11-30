import { create } from 'zustand'
import type { IDocumentRecord } from '../Interface'

interface DocumentStore {
  documents: IDocumentRecord[]
  loading: boolean
  selectedDocumentId: number | null
  setDocuments: (documents: IDocumentRecord[]) => void
  addDocument: (document: IDocumentRecord) => void
  removeDocument: (id: number) => void
  setLoading: (loading: boolean) => void
  setSelectedDocumentId: (id: number | null) => void
  currentDocument : IDocumentRecord | null
  setCurrentDocument: (document: IDocumentRecord | null) => void
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  loading: false,
  selectedDocumentId: null,
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) =>
    set((state) => ({
      documents: [document, ...state.documents],
    })),
  removeDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setSelectedDocumentId: (id) => set({ selectedDocumentId: id }),
  currentDocument : null,
  setCurrentDocument: (document) => set({ currentDocument: document }),
}))


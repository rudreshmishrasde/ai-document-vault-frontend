export type VaultDocument = {
  id: string
  name: string
  folder: string
  size: number
  uploadedAt: string
  summary: string
  markdown: string
  contentPreview: string
  sourceText: string
}

export type FolderDescriptor = {
  id: string
  name: string
  count: number
  accent?: string
}


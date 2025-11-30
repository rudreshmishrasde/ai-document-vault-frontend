export interface IDocumentRecord  {
    id: number
    original_filename: string
    created_at: string
    summary: string
  }

export interface IProps {
    setDocuments : React.Dispatch<React.SetStateAction<IDocumentRecord[]>>
    documents : IDocumentRecord[]
}  
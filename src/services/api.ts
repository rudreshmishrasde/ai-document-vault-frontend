import axios from "axios"
import { baseUrl } from "../env.const"

export const deleteDocument = (id : number) => {
    return axios.delete(`${baseUrl}/api/documents/${id}`)
}

export const getAllFolders = () => {
    return axios.get(`${baseUrl}/api/folders/`)
}

export const createFolder = (payload : {name : string}) => {
    return axios.post(`${baseUrl}/api/folders/` , payload)
}

export const getFolderFiles = (folderId : number) => {
    return axios.get(`${baseUrl}/api/folders/${folderId}/documents`)
}

export const uploadFolderDocuments = (payload : any , folderId : number) => {
    return axios.post(`${baseUrl}/api/folders/${folderId}/upload`, payload)
}

export const deleteFolder = (folderId : number) => {
    return axios.delete(`${baseUrl}/api/folders/${folderId}`)
}
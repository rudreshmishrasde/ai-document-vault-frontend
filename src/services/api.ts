import axios from "axios"
import { baseUrl } from "../env.const"

export const uploadDocument = (payload : any) => {
    return axios.post(`${baseUrl}/api/documents/upload`, payload)
}

export const getALlDocuments = () => {
    return axios.get(`${baseUrl}/api/documents/`)
}

export const deleteDocument = (id : number) => {
    return axios.delete(`${baseUrl}/api/documents/${id}`)
}
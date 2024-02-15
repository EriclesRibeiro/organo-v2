import { ImageListType } from "react-images-uploading"

export enum Status {
    Inativo,
    Ativo,
}

export interface TOrganoOverview {
    title: string
    subtitle: string
    creator: string
    lastUpdate: Date
    createdAt: Date
    description: string
    image: ImageListType
    email: string
}

export interface TOrganoItem {
    id: string
    name: string
    office: string
    linkedin?: string
    github?: string,
    status: Status,
    categorie: string
}

export interface TOrgano {
    id: string
    status: Status
    overview: TOrganoOverview
    items?: TOrganoItem[]
}
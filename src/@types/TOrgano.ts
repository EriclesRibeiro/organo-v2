import { ImageListType } from "react-images-uploading"

export enum Status {
    Inativo,
    Ativo,
}

export type TOrganoOverview = {
    title: string
    subtitle: string
    creator: string
    lastUpdate: Date
    createdAt: Date
    description: string
    image: ImageListType
    email: string
}

export type TOrganoItem = {
    id: string
    name: string
    office: string
    linkedin?: string
    github?: string,
    status: Status,
    categorie: string
}

export type TOrgano = {
    id: string
    status: Status
    overview: TOrganoOverview
    items?: TOrganoItem[]
}
import { ImageListType } from "react-images-uploading"

export enum Status {
    Ativo,
    Inativo,
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
    name: string
    office: string
    linkedin?: string
    github?: string
    status: Status
}

export interface TOrgano {
    id: string
    overview: TOrganoOverview
    items?: TOrganoItem[]
}
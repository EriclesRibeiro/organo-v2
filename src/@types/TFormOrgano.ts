import { ImageListType } from "react-images-uploading"

export type TFormOrgano = {
    titulo: string,
    subtitulo: string,
    criador: string,
    email: string,
    descricao: string,
    imagem: ImageListType | []
}
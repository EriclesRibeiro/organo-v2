import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from "react-icons/io"
import { ChangeEvent, FormEvent, useState } from "react"
import { v4 as uuid } from 'uuid'
import ImageUploading, { ImageListType } from 'react-images-uploading'

import { Label } from "./ui"
import { Button, Input } from "./ui"
import { Status, TOrgano } from "../@types/TOrgano"
import useDialog from '../hooks/useDialog'
import { TFormOrgano } from '../@types/TFormOrgano'

interface IHeaderProps {
    addOrgano: (data: TOrgano) => void
}

export function Header({ addOrgano }: IHeaderProps) {

    const [formData, setFormData] = useState<TFormOrgano>({
        titulo: '',
        subtitulo: '',
        criador: '',
        email: '',
        descricao: '',
        imagem: []
    })

    const [open, setOpen] = useDialog(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const validForm: TOrgano = {
            id: uuid(),
            status: Status.Ativo,
            overview: {
                createdAt: new Date(),
                creator: formData.criador,
                description: formData.descricao,
                email: formData.email,
                image: formData.imagem,
                lastUpdate: new Date(),
                subtitle: formData.subtitulo,
                title: formData.titulo,
            },
            items: []
        }
        setOpen(false)
        addOrgano(validForm)
    }

    function handleChangeImage(value: ImageListType, addUpdatedIndex?: number[]) {
        setFormData({
            ...formData,
            imagem: value
        })
    }

    function resetFormData() {
        setFormData({
            titulo: '',
            subtitulo: '',
            criador: '',
            email: '',
            descricao: '',
            imagem: []
        })
    }

    return (
        <div className="bg-transparent flex items-center justify-between py-5 px-[60px]">
            <h1 className="text-2xl font-black text-or-snow pointer-events-none">OR</h1>
            <Dialog.Root onOpenChange={resetFormData} open={open}>
                <Dialog.Trigger type="button" onClick={() => setOpen(true)}>
                    <span className="text-base text-or-lime/80 hover:text-or-lime transition font-medium cursor-pointer">+ Adicionar Organo</span>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="inset-0 fixed bg-or-dark/50" />
                    <Dialog.Content className="inset-0 md:inset-auto fixed bg-or-dark-saturated shadow-or-dark shadow-md px-5 py-5 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-2xl rounded-xl outline-none">
                        <div className="px-2 max-h-[calc(100vh-100px)] overflow-auto">
                            <div className="relative flex items-center justify-between">
                                <Dialog.Close type="button" onClick={() => setOpen(false)} className="absolute top-0 right-0 text-or-gray hover:text-or-lime transition">
                                    <IoMdClose size={20} />
                                </Dialog.Close>
                                <h1 className="text-xl font-medium text-or-snow">Adicionar Organo</h1>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col mt-5">
                                <div className="flex flex-col md:flex-row gap-2">
                                    <div className="grid w-full md:w-1/2">
                                        <Label className="" htmlFor="titulo">Título</Label>
                                        <Input onChange={handleChange} name="titulo" />
                                    </div>
                                    <div className="grid w-full md:w-1/2">
                                        <Label className="" htmlFor="subtitulo">Subtítulo</Label>
                                        <Input onChange={handleChange} name="subtitulo" />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 mt-4">
                                    <div className="grid w-full md:w-1/3">
                                        <Label className="" htmlFor="criador">Criador</Label>
                                        <Input onChange={handleChange} name="criador" />
                                    </div>
                                    <div className="grid w-full md:w-2/3">
                                        <Label className="" htmlFor="email">E-mail</Label>
                                        <Input onChange={handleChange} name="email" />
                                    </div>
                                </div>
                                <div className="grid w-full mt-4">
                                    <Label className="" htmlFor="descricao">Descrição</Label>
                                    <Input onChange={handleChange} name="descricao" />
                                </div>
                                <div className="grid w-full mt-4">
                                    <ImageUploading
                                        multiple={false}
                                        acceptType={['png', 'jpeg', 'jpg']}
                                        onChange={handleChangeImage}
                                        value={formData.imagem}
                                        dataURLKey="data_url">
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            <div className={`flex items-center justify-center w-full rounded-xl overflow-hidden relative ${imageList.length === 0 ? 'border border-dashed border-or-gray' : ''}`}>
                                                <button
                                                    type="button"
                                                    className={`w-full h-12 ${imageList.length > 0 ? 'hidden' : 'block'}`}
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    <span className={`text-sm font-medium ${isDragging ? 'text-or-lime' : 'text-or-gray'}`}>Clique ou arraste aqui</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={onImageRemoveAll}
                                                    className={`absolute top-2 right-2 text-or-gray hover:text-or-lime transition ${imageList.length > 0 ? 'block' : 'hidden'}`}
                                                ><IoMdClose size={20} />
                                                </button>
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img className="w-full h-full object-cover" src={image['data_url']} alt="" width="100" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 md:justify-end mt-4">
                                    <Dialog.Close onClick={() => setOpen(false)} type="button" asChild>
                                        <Button type="button" variant={"default"} className="w-full md:w-48"><span className="font-medium ">Cancelar</span></Button>
                                    </Dialog.Close>
                                    <Button variant={"fullcolor"} className="w-full md:w-48"><span className="font-medium">Adicionar</span></Button>
                                </div>
                            </form>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}
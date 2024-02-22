import { ChangeEvent, FormEvent, useState } from "react"
import { Status, TOrganoItem } from "../@types/TOrgano"
import { Organo } from "./organo"
import { Button, Input, Label } from "./ui"
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from "react-icons/io"
import useDialog from "../hooks/useDialog"
import { v4 as uuid } from 'uuid'
import InputSocialMedia from "./ui/input-social-media"
import Select from "./ui/select"
import { TCategorie } from "../@types/TCategorie"

interface IContainerCardsProps {
    categories: TCategorie[]
    data: TOrganoItem[]
    addOrganoItem: (data: TOrganoItem) => void,
    status: Status
}

export function ContainerCards({ 
    categories, 
    data, 
    addOrganoItem,
    status 
}: IContainerCardsProps) {
    const [search, setSearch] = useState<string>('')
    const [categorieSelected, setCategorieSelected] = useState<TCategorie>(categories[0])
    const [formData, setFormData] = useState<TOrganoItem>({
        categorie: categories[0].id,
        id: '',
        name: '',
        office: '',
        status: Status.Ativo,
        github: '',
        linkedin: ''
    })

    function handleSelectCategorie(id: string) {
        const selected = categories.find(item => item.id === id)
        if (selected) {
            setCategorieSelected(selected)
            setFormData({
                ...formData,
                categorie: selected.id
            })
        }
    }

    const [
        isDialogOpen,
        setIsDialogOpen,
        {
            openDialog,
            closeDialog
        }
    ] = useDialog()

    function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    function handleChangeForm(event: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const validForm = {
            ...formData,
            id: uuid()
        }

        addOrganoItem(validForm)
        closeDialog()
    }

    const filtered = data.filter(item =>
        item.name.toLowerCase()
            .includes(search.toLowerCase()))

    return (
        <Dialog.Root open={isDialogOpen}>
            <div className={`flex flex-col md:flex-row gap-2 md:items-center my-5 ${data.length === 0 ? 'justify-end' : 'md:justify-between'}`}>
                <Input
                    value={search}
                    onChange={handleChangeSearch}
                    placeholder="Pesquise aqui..."
                    className={`w-full md:w-80 ${data.length === 0 ? 'hidden' : ''}`} />
                <Dialog.Trigger asChild>
                    <Button
                        type="button"
                        variant={"fullcolor"}
                        disabled={status === 0}
                        className="w-full md:w-80 font-medium"
                        onClick={openDialog}>+ Adicionar</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="inset-0 fixed bg-or-dark/50" />
                    <Dialog.Content className="inset-0 md:inset-auto fixed bg-or-dark-saturated shadow-or-dark shadow-md px-5 py-5 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-2xl rounded-xl outline-none">
                        <div className="px-2 max-h-screen md:max-h-[calc(100vh-100px)] overflow-auto">
                            <div className="relative flex items-center justify-between">
                                <Dialog.Close type="button" onClick={closeDialog} className="absolute top-0 right-0 text-or-gray hover:text-or-lime transition">
                                    <IoMdClose size={20} />
                                </Dialog.Close>
                                <h1 className="text-xl font-medium text-or-snow">Adicionar Card</h1>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col mt-5">
                                <div className="grid w-full">
                                    <Label className="" htmlFor="titulo">Nome</Label>
                                    <Input onChange={handleChangeForm} name="name" />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 mt-4">
                                    <div className="grid w-full md:w-1/3">
                                        <Label className="" htmlFor="subtitulo">Categoria</Label>
                                        <Select
                                            data={categories}
                                            selectedValue={categorieSelected?.id}
                                            handleSelectedValue={handleSelectCategorie}
                                            selectKey="name" />
                                    </div>
                                    <div className="grid w-full md:w-2/3">
                                        <Label className="" htmlFor="criador">Cargo</Label>
                                        <Input onChange={handleChangeForm} name="office" />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 mt-4">
                                    <div className="grid w-full md:w-1/2">
                                        <Label className="" htmlFor="subtitulo">Github</Label>
                                        <InputSocialMedia onChange={handleChangeForm} name="github" />
                                    </div>
                                    <div className="grid w-full md:w-1/2">
                                        <Label className="" htmlFor="criador">Linkedin</Label>
                                        <InputSocialMedia onChange={handleChangeForm} name="linkedin" />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 md:justify-end mt-4">
                                    <Dialog.Close onClick={closeDialog} type="button" asChild>
                                        <Button type="button" variant={"default"} className="w-full md:w-48">
                                            <span className="font-medium ">Cancelar</span>
                                            </Button>
                                    </Dialog.Close>
                                    <Button type="submit" variant={"fullcolor"} className="w-full md:w-48">
                                        <span className="font-medium">Adicionar</span>
                                        </Button>
                                </div>
                            </form>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </div>
            {
                categories.map(categorie => (
                    <Organo
                        key={categorie.id}
                        categorie={categorie.name}
                        items={filtered.filter(item => item.categorie === categorie.id)} />
                ))
            }
        </Dialog.Root>
    )
}
import { ChangeEvent, useState } from "react"
import { TOrganoItem } from "../@types/TOrgano"
import { Organo } from "./organo"
import { Button, Input } from "./ui"
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from "react-icons/io"
import useDialog from "../hooks/useDialog"

interface IContainerCardsProps {
    categories: string[]
    data: TOrganoItem[]
}

export function ContainerCards({ categories, data }: IContainerCardsProps) {
    const [search, setSearch] = useState<string>('')
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
                        className="w-full md:w-80 font-medium"
                        onClick={openDialog}>+ Adicionar</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="inset-0 fixed bg-or-dark/50" />
                    <Dialog.Content className="inset-0 md:inset-auto fixed bg-or-dark-saturated shadow-or-dark shadow-md px-5 py-5 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-2xl rounded-xl outline-none">
                        <div className="px-2 max-h-[calc(100vh-100px)] overflow-auto">
                            <div className="relative flex items-center justify-between">
                                <Dialog.Close type="button" onClick={closeDialog} className="absolute top-0 right-0 text-or-gray hover:text-or-lime transition">
                                    <IoMdClose size={20} />
                                </Dialog.Close>
                                <h1 className="text-xl font-medium text-or-snow">Adicionar Card</h1>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </div>
            {
                categories.map(categorie => (
                    <Organo
                        key={categorie}
                        categorie={categorie}
                        items={filtered.filter(item => item.categorie === categorie)} />
                ))
            }
        </Dialog.Root>
    )
}
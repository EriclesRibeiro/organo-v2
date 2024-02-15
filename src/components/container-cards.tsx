import { ChangeEvent, useState } from "react"
import { TOrganoItem } from "../@types/TOrgano"
import { Organo } from "./organo"
import { Button, Input } from "./ui"

interface IContainerCardsProps {
    categories: string[]
    data: TOrganoItem[]
}

export function ContainerCards({ categories, data }: IContainerCardsProps) {
    const [search, setSearch] = useState<string>('')

    function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    const filtered = data.filter(item =>
        item.name.toLowerCase()
            .includes(search.toLowerCase()))
    return (
        <>
            <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between my-5">
                <Input
                    value={search}
                    onChange={handleChangeSearch}
                    placeholder="Pesquise aqui..."
                    className="w-full md:w-80" />
                <Button variant={"fullcolor"} className="w-full md:w-80 font-medium">+ Adicionar</Button>
            </div>
            {
                categories.map(categorie => (
                    <Organo
                        key={categorie}
                        categorie={categorie}
                        items={filtered.filter(item => item.categorie === categorie)} />
                ))
            }
        </>
    )
}
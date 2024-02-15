import { useState } from "react";
import { TOrganoItem } from "../@types/TOrgano";
import { Card } from "./card";

interface IOrganoProps {
    items: TOrganoItem[]
    categorie: string
}

export function Organo({ items, categorie }: IOrganoProps) {
    const [search, setSearch] = useState<string>('')

    const filtered = items.filter(item =>
        item.name.toLowerCase()
            .includes(search.toLowerCase()))

    return (
        items.length > 0 && (
            <div className="flex flex-col items-center my-5">
                <p className="text-or-lime text-sm font-semibold mb-2">{categorie}</p>
                <div className="w-full flex flex-wrap justify-center gap-2">
                    {items.map(item => (
                        <Card key={item.id} data={item} />
                    ))}
                </div>
            </div>
        )
    )
}
import { TOrganoItem } from "../@types/TOrgano"
import { Organo } from "./organo"

interface IContainerCardsProps {
    categories: string[]
    data: TOrganoItem[]
}

export function ContainerCards({ categories, data }: IContainerCardsProps) {
    return (
        categories.map(categorie => (
            <Organo
                key={categorie}
                categorie={categorie}
                items={data.filter(item => item.categorie === categorie)} />
        ))
    )
}
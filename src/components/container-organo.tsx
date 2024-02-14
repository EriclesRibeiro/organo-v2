import { TOrganoItem } from "../@types/TOrgano";

interface IContainerOrganoProps {
    items: TOrganoItem[]
}

export function ContainerOrgano({ items }: IContainerOrganoProps) {
    return (
        <section>
            {items.map(item => (<p>{item.name}</p>))}
        </section>
    )
}
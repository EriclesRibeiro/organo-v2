import { TOrganoItem } from "../@types/TOrgano";

interface IOrganoViewProps {
    items: TOrganoItem[] | []
}

export function OrganoView({ items }: IOrganoViewProps) {
    return (
        <section>
            {items.map(item => (<p>{item.name}</p>))}
        </section>
    )
}
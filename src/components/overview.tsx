import { ptBR } from "date-fns/locale"
import { IoIosClose } from "react-icons/io"
import { formatDistanceToNow } from "date-fns"

import { Status, TOrganoOverview } from "../@types/TOrgano"
import { Button } from "./ui"

interface IOverviewProps {
    data: {
        overview: TOrganoOverview,
        status: Status,
        id: string
    }
    inactivateOrgano: (id: string) => void
    removeOrgano: (id: string) => void
}

export function Overview({ data: { overview, status, id }, inactivateOrgano, removeOrgano }: IOverviewProps) {

    function handleInactivateOrgano() {
        inactivateOrgano(id)
    }

    function handleRemoveOrgano() {
        removeOrgano(id)
    }

    return (
        <section className="rounded-xl h-auto md:h-[312px] bg-or-dark-saturated overflow-hidden flex flex-row">
            <div className="p-5 w-2/3 relative">
                <div className="flex flex-col md:flex-row md:justify-between">
                    <p className="text-sm font-medium text-or-gray">Visão geral</p>
                    <div className="inline-flex gap-4">
                        <p className="text-sm font-light text-or-gray">criado<span className="pl-1">{formatDistanceToNow(new Date(overview.createdAt), { locale: ptBR, addSuffix: true })}</span></p>
                        <p className={`font-medium text-sm ${status ? 'text-or-lime' : 'text-red-500'}`}>{status ? ('Ativo') : ('Inativo')}</p>
                        <p
                            onClick={handleRemoveOrgano}
                            className="font-medium text-sm text-or-gray hover:text-red-500 transition cursor-pointer">Remover</p>
                    </div>
                </div>
                <div className="pt-4 pb-2">
                    <p className="text-or-snow text-2xl font-medium leading-6">{overview.title}</p>
                    <p className="text-sm font-light text-or-gray">{overview.subtitle}</p>
                </div>
                <div className="py-2 grid grid-cols-1 md:grid-cols-2">
                    <div className="">
                        <p className="text-sm font-light text-or-gray">criado por</p>
                        <p className="text-base font-light text-or-snow">{overview.creator}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-light text-or-gray">última atualização</p>
                        <p className="text-base font-light text-or-snow">{formatDistanceToNow(new Date(overview.lastUpdate), { locale: ptBR, addSuffix: true })}</p>
                    </div>
                </div>
                <div className="py-2">
                    <p className="text-sm font-light text-or-gray">e-mail</p>
                    <p className="text-base font-light text-or-snow">{overview.email}</p>
                </div>
                <div className="py-2 flex justify-between">
                    <div className="">
                        <p className="text-sm font-light text-or-gray">descrição</p>
                        <p className="text-base font-light text-or-snow">{overview.description}</p>
                    </div>
                    <Button type="button" variant={"default"} disabled={status ? false : true} className="w-[200px]" onClick={handleInactivateOrgano}>
                        <span className="text-base font-medium">Inativar</span>
                    </Button>
                </div>
            </div>
            <div className="w-1/3 h-auto">
                <img className="w-full h-full object-cover" src={overview.image[0].data_url} alt={overview.title} />
            </div>
        </section>
    )
}
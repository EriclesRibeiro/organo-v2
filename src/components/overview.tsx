import { ImageListType } from "react-images-uploading"
import { TOrganoOverview } from "../@types/TOrgano"
import { Button } from "./ui"

interface IOverviewProps {
    data: TOrganoOverview
}

export function Overview({ data }: IOverviewProps) {

    return (
        <section className="rounded-xl h-[312px] bg-or-dark-saturated overflow-hidden flex flex-row">
            <div className="p-5 w-2/3">
                <div className="flex justify-between">
                    <p className="text-sm font-medium text-or-gray">Visão geral</p>
                    <p className="text-sm font-light text-or-gray">criado em<span className="pl-1">{data.createdAt.toISOString()}</span></p>
                </div>
                <div className="pt-4 pb-2">
                    <p className="text-or-snow text-2xl font-medium leading-6">{data.title}</p>
                    <p className="text-sm font-light text-or-gray">{data.subtitle}</p>
                </div>
                <div className="py-2 grid grid-cols-2">
                    <div className="">
                        <p className="text-sm font-light text-or-gray">criado por</p>
                        <p className="text-base font-light text-or-snow">{data.creator}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-light text-or-gray">última atualização</p>
                        <p className="text-base font-light text-or-snow">{data.lastUpdate.toISOString()}</p>
                    </div>
                </div>
                <div className="py-2">
                    <p className="text-sm font-light text-or-gray">e-mail</p>
                    <p className="text-base font-light text-or-snow">{data.email}</p>
                </div>
                <div className="py-2 flex justify-between">
                    <div className="">
                        <p className="text-sm font-light text-or-gray">descrição</p>
                        <p className="text-base font-light text-or-snow">{data.description}</p>
                    </div>
                    <Button variant={"default"} className="w-[200px]"><span className="text-base font-medium text-or-lime">Inativar</span></Button>
                </div>
            </div>
            <div className="w-1/3 h-auto">
                <img className="w-full h-full object-cover" src={data.image[0].data_url} alt={data.title} />
            </div>
        </section>
    )
}
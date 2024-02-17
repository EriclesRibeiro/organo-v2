import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"

import { TOrganoItem } from "../@types/TOrgano"

interface ICardProps {
    data: TOrganoItem
}

const Card = ({ data }: ICardProps) => {
    return (
        <div className='group p-3 rounded-xl bg-or-dark-saturated hover:bg-or-dark hover:ring-1 hover:ring-or-lime transition w-full sm:w-[232px] cursor-pointer'>
            <div className="flex justify-between">
                <div className="overflow-hidden rounded-xl w-10 h-10 border border-or-lime/80">
                    <img className="object-cover" src={`http://github.com/${data.github}.png`} alt={data.name} />
                </div>
                <span className="font-medium text-sm text-or-lime/80 group-hover:text-or-lime transition">{data.status ? 'Ativo' : 'Inativo'}</span>
            </div>
            <div className="flex flex-col py-2">
                <p className="leading-none text-or-snow text-sm font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">{data.name}</p>
                <span className="leading-none text-or-gray text-xs font-light whitespace-nowrap overflow-hidden overflow-ellipsis">{data.office}</span>
            </div>
            <div className="grid grid-cols-2">
                <p className="text-or-gray text-xs font-light whitespace-nowrap overflow-hidden overflow-ellipsis"><FaLinkedin className="group-hover:text-or-lime transition" size={20} />{data.linkedin}</p>
                <p className="text-or-gray text-xs font-light whitespace-nowrap overflow-hidden overflow-ellipsis"><FaGithub className="group-hover:text-or-lime transition" size={20} /> {data.github}</p>
            </div>
        </div>
    )
}

export default Card
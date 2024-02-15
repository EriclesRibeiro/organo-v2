import { ReactNode } from "react";

interface IContainerMaxWidthProps {
    children: ReactNode
}

export function ContainerMaxWidth({ children }: IContainerMaxWidthProps) {
    return (
        <div className="max-w-[1160px] w-full bg-transparent mx-auto px-3">
            <div className="text-center py-5">
                <h1 className="text-or-snow text-2xl font-bold leading-6">Bem vindo ao Organo</h1>
                <p className="text-or-gray text-base font-light">Vamos organizar nosso tempo juntos</p>
            </div>
            {children}
        </div>
    )
}
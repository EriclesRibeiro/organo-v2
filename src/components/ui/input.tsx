import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input({ className, ...props }: IInputProps) {
    return (
        <input
            className={`outline-none text-or-snow text-base bg-transparent border border-or-gray focus:ring-1 focus:ring-or-lime transition rounded-xl h-12 px-3 ${className}`}
            {...props}
        />
    )
}
import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef((
    { className, ...props }: IInputProps,
    ref: LegacyRef<HTMLInputElement>) => {
    return (
        <input
            ref={ref}
            className={`outline-none text-or-snow text-base bg-transparent border border-or-gray focus:ring-1 focus:ring-or-lime transition rounded-xl h-12 px-3 ${className}`}
            {...props}
        />
    )
})

export default Input
import { InputHTMLAttributes } from "react"

interface IInputSocialMediaProps extends InputHTMLAttributes<HTMLInputElement> { }

const InputSocialMedia = (
    { className, ...props }: IInputSocialMediaProps
) => {
    return (
        <div className="relative grid before:h-10 before:w-12 before:rounded-l-xl before:absolute before:top-1 before:left-1 before:bg-or-gray/40 focus-within:before:bg-or-lime after:content-['@'] after:text-or-lime focus-within:after:text-or-dark after:text-xl after:font-normal after:absolute after:left-5 after:top-2 transition">
            <input
                {...props}
                className="outline-none text-or-snow text-base bg-transparent border border-or-gray focus:ring-1 focus:ring-or-lime transition rounded-xl h-12 pl-14 pr-3" />
        </div>
    )
}

export default InputSocialMedia
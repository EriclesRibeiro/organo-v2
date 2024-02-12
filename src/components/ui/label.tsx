import { LabelHTMLAttributes } from "react";

interface ILabelProps extends LabelHTMLAttributes<HTMLLabelElement> { }

export function Label({ className, children, ...props }: ILabelProps) {
    return (
        <label
            className={`text-sm text-or-gray font-light leading-5 ${className}`}
            {...props}>{children}</label>
    )
}
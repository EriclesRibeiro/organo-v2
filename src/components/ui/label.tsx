import { LabelHTMLAttributes, LegacyRef, forwardRef } from "react";

interface ILabelProps extends LabelHTMLAttributes<HTMLLabelElement> { }

const Label = forwardRef((
    { className, children, ...props }: ILabelProps,
    ref: LegacyRef<HTMLLabelElement>
) => {
    return (
        <label
            ref={ref}
            className={`text-sm text-or-gray font-light leading-5 ${className}`}
            {...props}>{children}</label>
    )
})

export default Label
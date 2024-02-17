import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, LegacyRef, forwardRef } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
    'outline-none rounded-xl h-12 p-2 border-none transition flex items-center justify-center',
    {
        variants: {
            variant: {
                default:
                    'bg-or-dark/80 hover:bg-or-dark disabled:hover:bg-or-dark/80 disabled:opacity-80 disabled:cursor-not-allowed text-or-snow',
                fullcolor:
                    'bg-or-lime/80 hover:bg-or-lime disabled:hover:bg-or-lime/80 disabled:opacity-80 disabled:cursor-not-allowed text-or-dark',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

interface IButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }


const Button = forwardRef((
    { children, className, variant, ...props }: IButtonProps,
    ref: LegacyRef<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            ref={ref}
            className={cn(buttonVariants({ variant }), className)}
        >{children}</button>
    )
})

export default Button
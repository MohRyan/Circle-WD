import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative ",
  {
    variants: {
      variant: {
        // default: "bg-second text-primary-foreground hover:bg-green-600",
        default:
          "bg-second text-primary-foreground transition-colors before:absolute before:left-0 before:top-0 before:z-10 before:h-8 before:w-full before:origin-top before:scale-x-0 before:bg-white before:rounded-lg before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100 hover:text-black",
        batal:
          "bg-red-500 text-primary-foreground transition-colors before:absolute before:left-0 before:top-0 before:z-10 before:h-8 before:w-full before:origin-top before:scale-x-0 before:bg-white before:rounded-lg before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100 hover:text-black",
        profile:
          "bg-gray-500 text-primary-foreground transition-colors before:absolute before:left-0 before:top-0 before:z-10 before:h-8 before:w-full before:origin-top before:scale-x-0 before:bg-white before:rounded-lg before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100 hover:text-black",
        unFollow:
          "bg-white text-primary-foreground transition-colors before:absolute before:left-0 before:top-0 before:z-10 before:h-8 before:w-full before:origin-top before:scale-x-0 before:bg-gray-500 before:rounded-md before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100 text-black",
        rounded:
          "bg-second text-primary-foreground transition-colors before:absolute before:z-10 before:h-8 before:w-full before:origin-top before:scale-x-0 before:bg-red-700 before:rounded-full before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-4 py-2",
        follow: "h-6 rounded-md px-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

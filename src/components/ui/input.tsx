import * as React from "react"
import { FaCheckCircle } from "react-icons/fa";
import { cn } from "@/lib/utils"
import { IconType } from "react-icons";

export interface InputProps 
extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'valid' | 'invalid'
}

function getIcon(variant?: string): React.ReactElement<IconType> | undefined {
  const className = "absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2";
  
  if (variant == 'valid') return <FaCheckCircle className={cn(className, "text-green-500 right-0")}/>;
  if(variant == 'invalid') return
}

function getBorder(variant?: string): string | undefined {
  if (variant == 'valid') return 'border-b-4 border-b-green-400';
  if (variant == 'invalid') return
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant ,...props }, ref) => {
    return (
      <div className={cn("relative", className, getBorder(variant))}>
        <input
        type={type}
        className={cn("flex h-12 w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50")}
        ref={ref}
        {...props}
        />
        {getIcon(variant)}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

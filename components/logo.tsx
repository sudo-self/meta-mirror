import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconClassName?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, iconClassName, size = "md" }: LogoProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "p-1",
          icon: "h-4 w-4",
        }
      case "lg":
        return {
          container: "p-2",
          icon: "h-6 w-6",
        }
      default:
        return {
          container: "p-1.5",
          icon: "h-5 w-5",
        }
    }
  }

  const sizeClasses = getSizeClasses()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("rounded-md bg-primary", sizeClasses.container)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={cn(sizeClasses.icon, iconClassName)}
        >
          <path
            fill="#919191"
            d="m8.29 10.28l3.24-3.25l1.06 1.06l-3.24 3.25zm.41 4.33l5.66-5.66L15.42 10l-5.66 5.67zM14.17 3L18 6.83v10.34L14.17 21H9.83L6 17.17V6.83L9.83 3zM15 1H9L4 6v12l5 5h6l5-5V6z"
          />
        </svg>
      </div>
    </div>
  )
}

export function LogoWithText({
  className,
  iconClassName,
  size = "md",
  textClassName,
}: LogoProps & { textClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Logo size={size} iconClassName={iconClassName} className="gap-0" />
      <h1 className={cn("font-semibold tracking-tight", textClassName)}>Meta-Mirror</h1>
    </div>
  )
}


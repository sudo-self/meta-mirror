import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconClassName?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, iconClassName, size = "md" }: LogoProps) {
  // Determine size classes based on the size prop
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
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(sizeClasses.icon, "text-primary-foreground", iconClassName)}
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
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
      <h1 className={cn("font-semibold tracking-tight", textClassName)}>OG Debugger</h1>
    </div>
  )
}

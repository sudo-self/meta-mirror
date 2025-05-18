import type React from "react"
import { cn } from "@/lib/utils"

interface IconWrapperProps {
  children: React.ReactNode
  className?: string
  label: string
}

/**
 * A wrapper component for SVG icons that ensures consistent sizing,
 * accessibility, and proper rendering across different devices.
 */
export function IconWrapper({ children, className, label }: IconWrapperProps) {
  return (
    <span
      className={cn("inline-flex items-center justify-center icon-high-contrast", className)}
      role="img"
      aria-label={label}
    >
      {children}
    </span>
  )
}

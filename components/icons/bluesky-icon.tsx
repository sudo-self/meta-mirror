import { IconWrapper } from "./icon-wrapper"

export function BlueskyIcon({ className }: { className?: string }) {
  return (
    <IconWrapper label="Bluesky logo" className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {/* More accurate Bluesky logo representation */}
        <path d="M12 2L3 7l9 5l9-5l-9-5z" />
        <path d="M3 12l9 5l9-5" />
        <path d="M3 17l9 5l9-5" />
      </svg>
    </IconWrapper>
  )
}

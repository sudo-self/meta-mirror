import { IconWrapper } from "../icon-wrapper"

export function BlueskyFilledIcon({ className }: { className?: string }) {
  return (
    <IconWrapper label="Bluesky logo" className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 1L2 6.652l10 5.652L22 6.652 12 1zM5.5 13.174V8.558l6.5 3.652 6.5-3.652v4.616L12 17.826l-6.5-4.652z" />
        <path d="M5.5 18.174v-3.652L12 18.826l6.5-4.304v3.652L12 22.826l-6.5-4.652z" />
      </svg>
    </IconWrapper>
  )
}

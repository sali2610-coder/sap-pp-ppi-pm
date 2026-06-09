// Inline CBC wordmark — no external asset (offline-safe). Swap for the real
// CBC logo SVG in /public when supplied.
export function SiteLogo({ className }: { className?: string }) {
  return (
    <span className={className} aria-label="CBC Israel" role="img">
      <span className="inline-flex items-center gap-2">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
          <rect width="34" height="34" rx="8" fill="white" />
          <path
            d="M11.5 11.2c-2.8 0-4.7 2.2-4.7 5.6s1.9 5.6 4.7 5.6c1.7 0 3-.8 3.8-2.1l-1.9-1c-.4.6-1 1-1.9 1-1.4 0-2.3-1.1-2.3-3.5s.9-3.5 2.3-3.5c.8 0 1.4.4 1.8 1l1.9-1c-.8-1.3-2-2.1-3.7-2.1Z"
            fill="#d62027"
          />
          <path
            d="M21.4 11.4h-4.2v11h4.4c2.5 0 4-1.2 4-3.2 0-1.4-.8-2.4-2-2.6 1-.3 1.6-1.2 1.6-2.3 0-1.8-1.4-2.9-3.8-2.9Zm-1.9 1.9h1.6c1 0 1.6.4 1.6 1.3 0 .8-.6 1.3-1.6 1.3h-1.6v-2.6Zm0 4.4h1.8c1.1 0 1.7.5 1.7 1.4s-.6 1.4-1.7 1.4h-1.8v-2.8Z"
            fill="#d62027"
          />
        </svg>
        <span className="text-lg font-bold tracking-tight">NEO Cockpit</span>
      </span>
    </span>
  );
}

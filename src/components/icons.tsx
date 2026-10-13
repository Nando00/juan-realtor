import type { CSSProperties } from "react";

export type IconName =
  | "arrow"
  | "arrow-up"
  | "chevron"
  | "pin"
  | "search"
  | "heart"
  | "bed"
  | "bath"
  | "area"
  | "menu"
  | "close"
  | "check"
  | "phone"
  | "mail"
  | "home"
  | "key"
  | "star"
  | "plus";

export function Icon({
  name,
  size = 20,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h16M14 6l6 6-6 6" />
      </>
    ),
    "arrow-up": (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    ),
    bed: (
      <>
        <path d="M3 18v3m18-3v3M3 12V5h18v7M2 18v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5ZM7 11V8h4v3m2 0V8h4v3" />
      </>
    ),
    bath: (
      <>
        <path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Zm2 0V5a3 3 0 0 1 6 0M9 6h4M6 20v2m12-2v2" />
      </>
    ),
    area: (
      <>
        <path d="M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5M4 4l6 6m10 10-6-6" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    phone: (
      <path d="M8 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-4l-5-2-2 2a13 13 0 0 1-6-6l2-2Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    home: (
      <>
        <path d="m2 10 10-8 10 8M5 8v13h14V8M9 21v-8h6v8" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="8" r="5" />
        <path d="m12 12 9 9m-3-3 3-3m-6 0 3-3" />
      </>
    ),
    star: (
      <path d="m12 3 2.8 5.6L21 9.5 16.5 14l1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.5l6.2-.9Z" />
    ),
    plus: <path d="M12 4v16M4 12h16" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {paths[name]}
    </svg>
  );
}

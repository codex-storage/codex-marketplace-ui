type Props = {
  variant: "primary" | "error";
};

export function AlphaIcon({ variant }: Props) {
  const color =
    variant === "primary"
      ? "var(--codex-color-primary)"
      : "var(--codex-color-error-hexa)";
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.957 1.38171C13.0441 1.33141 13.1515 1.33141 13.2386 1.38171L23.1736 7.11769C23.2607 7.16799 23.3144 7.26095 23.3144 7.36156V18.8335C23.3144 18.9341 23.2607 19.0271 23.1736 19.0774L13.2386 24.8134C13.1515 24.8637 13.0441 24.8637 12.957 24.8134L3.02198 19.0774L2.47465 20.0254L3.02198 19.0774C2.93485 19.0271 2.88118 18.9341 2.88118 18.8335V7.36156C2.88118 7.26095 2.93485 7.16799 3.02198 7.11769L2.45878 6.14219L3.02198 7.11769L12.957 1.38171Z"
        stroke={color}
        strokeWidth="2.25282"
      />
      <circle cx="13.0978" cy="13.0975" r="3.92933" fill={color} />
    </svg>
  );
}

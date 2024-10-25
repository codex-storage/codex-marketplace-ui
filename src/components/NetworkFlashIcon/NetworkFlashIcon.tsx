type Props = {
  online: boolean;
};

export function NetworkFlashIcon({ online }: Props) {
  const color = online ? "#3EE089" : "var(--codex-color-error-hexa)";

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M10.75 8.5H16L9.25 18.25V11.5H4L10.75 1.75V8.5Z" fill={color} />
    </svg>
  );
}

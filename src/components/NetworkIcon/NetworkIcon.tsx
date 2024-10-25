type Props = {
  active?: boolean;
};

export function NetworkIcon({ active }: Props) {
  const stroke = active ? "#3EE089" : "rgb(var(--codex-color-error))";
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M9.11111 2L2 9.11111M10 6.44444L6.44444 10" stroke={stroke} />
    </svg>
  );
}

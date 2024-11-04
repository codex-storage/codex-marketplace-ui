type Props = {
  variant: "default" | "success" | "failure";
};

export function NodesIcon({ variant }: Props) {
  let color = "#969696";

  if (variant === "success") {
    color = "#3EE089";
  }

  if (variant === "failure") {
    color = "var(--codex-color-error-hexa)";
  }

  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.5 0.5C5.914 0.5 6.25 0.836 6.25 1.25V4.25C6.25 4.664 5.914 5 5.5 5H4V6.5H7.75V5.75C7.75 5.336 8.086 5 8.5 5H13C13.414 5 13.75 5.336 13.75 5.75V8.75C13.75 9.164 13.414 9.5 13 9.5H8.5C8.086 9.5 7.75 9.164 7.75 8.75V8H4V12.5H7.75V11.75C7.75 11.336 8.086 11 8.5 11H13C13.414 11 13.75 11.336 13.75 11.75V14.75C13.75 15.164 13.414 15.5 13 15.5H8.5C8.086 15.5 7.75 15.164 7.75 14.75V14H3.25C2.836 14 2.5 13.664 2.5 13.25V5H1C0.586 5 0.25 4.664 0.25 4.25V1.25C0.25 0.836 0.586 0.5 1 0.5H5.5ZM12.25 12.5H9.25V14H12.25V12.5ZM12.25 6.5H9.25V8H12.25V6.5ZM4.75 2H1.75V3.5H4.75V2Z"
        fill={color}
      />
    </svg>
  );
}

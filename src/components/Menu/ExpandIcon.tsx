type Props = {
  onClick?: () => void;
};

export function ExpandIcon({ onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      height="20"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.45746"
        y="0.5"
        width="15"
        height="15"
        rx="4.5"
        stroke="#515151"
      />
      <path
        d="M8.07651 3.88107L8.07646 7.44461L11.1798 7.44466V8.55577L8.07646 8.55572L8.0764 12.1191L3.95746 8.00011L8.07651 3.88107ZM12.2909 11.889V4.11121H13.402V11.889H12.2909Z"
        fill="#969696"
      />
    </svg>
  );
}

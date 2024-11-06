type Props = {
  onClick?: () => void;
};

export function ChevronDown({ onClick, ...rest }: Props) {
  return (
    <svg
      width={20}
      onClick={onClick}
      {...rest}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.99999 10.8785L13.7125 7.16602L14.773 8.22652L9.99999 12.9995L5.22699 8.22652L6.28749 7.16602L9.99999 10.8785Z"
        fill="#969696"
      />
    </svg>
  );
}

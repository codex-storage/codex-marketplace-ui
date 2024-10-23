type Props = {
  onClick?: () => void;
};

export function Logo({ onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      className="logo"
      width="30"
      height="34"
      viewBox="0 0 30 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.2342 1.43459L14.9745 1.27686L14.7149 1.43477L0.989288 9.78295L0.749113 9.92903L0.749113 10.2101L0.749112 23.7179L0.749112 23.9969L0.98663 24.1434L14.6387 32.5639L14.8995 32.7247L15.1611 32.5654L28.9813 24.1553L29.2213 24.0092L29.2213 23.7282L29.2213 10.2101L29.2213 9.9288L28.9809 9.78277L15.2342 1.43459ZM14.9747 3.31423L27.4337 10.9038L27.4337 23.035L14.9129 30.6848L2.51571 23.0364L2.51571 10.9038L14.9747 3.31423Z"
        fill="var(--codex-color-primary)"
        stroke="var(--codex-color-primary)"
      />
      <path
        d="M14.5966 31.705L15.3422 31.705L15.3422 2.23351L14.5966 2.23351L14.5966 31.705Z"
        fill="var(--codex-color-primary)"
      />
      <path
        d="M21.2337 27.577L21.9793 27.577L21.9793 6.35054L21.2337 6.35054L21.2337 27.577Z"
        fill="var(--codex-color-primary)"
      />
      <path
        d="M7.90706 27.577L8.65267 27.577L8.65267 6.35054L7.90706 6.35054L7.90706 27.577Z"
        fill="var(--codex-color-primary)"
      />
      <path
        d="M8.46544 28.0195L28.4616 17.4088L28.1073 16.7641L8.11114 27.3748L8.46544 28.0195Z"
        fill="var(--codex-color-primary)"
      />
      <path
        d="M1.79454 24.0028L28.4599 10.8989L28.1264 10.2436L1.46103 23.3475L1.79454 24.0028Z"
        fill="var(--codex-color-primary)"
      />
      <path
        d="M21.4216 27.9492L21.7759 27.3045L1.77983 16.6938L1.42553 17.3385L21.4216 27.9492Z"
        fill="var(--codex-color-primary)"
      />
    </svg>
  );
}

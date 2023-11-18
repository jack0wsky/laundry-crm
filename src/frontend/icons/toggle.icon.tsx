interface IconProps {
  className?: string;
}

export const ToggleIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      strokeWidth="1.3"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

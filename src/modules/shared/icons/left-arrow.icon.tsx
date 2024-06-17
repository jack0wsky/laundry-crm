import { IconProps } from "@/modules/shared/icons/types";

export const LeftArrowIcon = ({ className }: IconProps) => (
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
      d="M15 6L9 12L15 18"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

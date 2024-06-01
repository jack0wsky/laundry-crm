import { IconProps } from "@/modules/shared/icons/types";

export const RightArrowIcon = ({ className }: IconProps) => (
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
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

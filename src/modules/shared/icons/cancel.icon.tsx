import type { IconProps } from "@/modules/shared/icons/types";

export const CancelIcon = ({ className }: IconProps) => {
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
        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

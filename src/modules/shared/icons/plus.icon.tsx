import { IconProps } from "@/modules/shared/icons/types";

export const PlusIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10H10M10 10H15M10 10V5M10 10V15"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

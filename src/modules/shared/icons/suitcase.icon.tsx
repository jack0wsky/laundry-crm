import { IconProps } from "@/modules/shared/icons/types";

export const SuitcaseIcon = ({ className }: IconProps) => {
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
        d="M6.66675 5.83333H3.33341C2.41294 5.83333 1.66675 6.57952 1.66675 7.5V15.8333C1.66675 16.7538 2.41294 17.5 3.33341 17.5H16.6667C17.5872 17.5 18.3334 16.7538 18.3334 15.8333V7.5C18.3334 6.57952 17.5872 5.83333 16.6667 5.83333H13.3334M6.66675 5.83333V3C6.66675 2.72386 6.89061 2.5 7.16675 2.5H12.8334C13.1096 2.5 13.3334 2.72386 13.3334 3V5.83333M6.66675 5.83333H13.3334"
        stroke="currentColor"
        strokeWidth="1.08333"
      />
    </svg>
  );
};

import { IconProps } from "@/modules/shared/icons/types";

export const DraggableIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="6" r="1" fill="currentColor" />
    <circle cx="8" cy="10" r="1" fill="currentColor" />
    <circle cx="8" cy="14" r="1" fill="currentColor" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
    <circle cx="12" cy="10" r="1" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
  </svg>
);

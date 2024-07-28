import { IconProps } from "@/modules/shared/icons/types";

export const CalendarIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2.66665V1.33331M10 2.66665V3.99998M10 2.66665H7M2 6.66665V12.6666C2 13.403 2.59695 14 3.33333 14H12.6667C13.4031 14 14 13.403 14 12.6666V6.66665H2Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 6.66669V4.00002C2 3.26364 2.59695 2.66669 3.33333 2.66669H4.66667"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66669 1.33331V3.99998"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 6.66669V4.00002C14 3.26364 13.403 2.66669 12.6666 2.66669H12.3333"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

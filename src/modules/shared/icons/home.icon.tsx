import { IconProps } from "@/modules/shared/icons/types";

export const HomeIcon = ({ className }: IconProps) => {
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
        d="M14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V8.92299C2.5 7.75738 3.10884 6.67645 4.10566 6.07232L8.27233 3.54707C9.33425 2.9035 10.6658 2.9035 11.7277 3.54707L15.8943 6.07232C16.8912 6.67645 17.5 7.75738 17.5 8.92299V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5Z"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 14.1667H12.5"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

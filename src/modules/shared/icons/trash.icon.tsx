import { IconProps } from "@/modules/shared/icons/types";

export const TrashIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3334 6L12.0034 13.5642C11.8913 14.2017 11.3375 14.6667 10.6903 14.6667H5.30991C4.66261 14.6667 4.10881 14.2017 3.99672 13.5642L2.66675 6"
      stroke="currentColor"
      strokeWidth="0.866667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 3.99992H10.25M10.25 3.99992V2.66659C10.25 1.93021 9.65307 1.33325 8.91667 1.33325H7.08333C6.34695 1.33325 5.75 1.93021 5.75 2.66659V3.99992M10.25 3.99992H5.75M2 3.99992H5.75"
      stroke="currentColor"
      strokeWidth="0.866667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

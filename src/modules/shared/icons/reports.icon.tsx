import { IconProps } from "@/modules/shared/icons/types";

export const ReportsIcon = ({ className }: IconProps) => {
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
        d="M7.5 17.5H12.5M7.5 17.5V13.3333M7.5 17.5H3C2.72386 17.5 2.5 17.2762 2.5 17V13.8333C2.5 13.5572 2.72386 13.3333 3 13.3333H7.5M12.5 17.5V7.5M12.5 17.5H17C17.2762 17.5 17.5 17.2762 17.5 17V3C17.5 2.72386 17.2762 2.5 17 2.5H13C12.7238 2.5 12.5 2.72386 12.5 3V7.5M7.5 13.3333V8C7.5 7.72386 7.72386 7.5 8 7.5H12.5"
        stroke="currentColor"
        strokeWidth="1.08333"
      />
    </svg>
  );
};

import { clsx } from "clsx";

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={clsx(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-palette-blue-600 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white",
        className,
      )}
      role="status"
    />
  );
};

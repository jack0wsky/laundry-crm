import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  href?: string;
  prefix?: any;
}
export const Button = ({
  children,
  variant = "primary",
  className,
  href,
  prefix,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  if (props.onClick || props.type === "submit" || props.type === "button") {
    return (
      <button
        className={clsx(
          "flex gap-x-2 justify-center items-center px-6 py-3 rounded-full font-bold disabled:opacity-40",
          variant === "primary" && "bg-blue-600 hover:bg-blue-700 text-white",
          variant === "secondary" &&
            "bg-white hover:bg-gray-200 text-gray-800 border border-gray-300 disabled:text-gray-500",
          variant === "destructive" && "bg-palette-red-500 text-white",
          className,
        )}
        {...props}
      >
        {prefix}

        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "flex gap-x-2 justify-center items-center px-6 py-3 rounded-full font-bold disabled:opacity-40 cursor-pointer",
        variant === "primary" && "bg-blue-600 hover:bg-blue-700 text-white",
        variant === "secondary" &&
          "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 disabled:text-gray-500",
        variant === "destructive" && "bg-palette-red-500 text-white",
        className,
      )}
    >
      {prefix}

      {children}
    </a>
  );
};

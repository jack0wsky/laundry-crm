import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
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
  if (props.onClick) {
    return (
      <button
        className={classNames(
          "flex gap-x-2 justify-center items-center px-6 py-3 rounded-xl font-medium disabled:opacity-40",
          {
            "bg-blue-600 hover:bg-blue-700 text-white": variant === "primary",
            "bg-white hover:bg-gray-200 text-gray-800 border border-gray-300 disabled:text-gray-500":
              variant === "secondary",
          },
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
      className={classNames(
        "flex gap-x-2 justify-center items-center px-6 py-3 rounded-xl font-medium disabled:opacity-40",
        {
          "bg-blue-600 hover:bg-blue-700 text-white": variant === "primary",
          "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 disabled:text-gray-500":
            variant === "secondary",
        },
        className,
      )}
    >
      {prefix}

      {children}
    </a>
  );
};

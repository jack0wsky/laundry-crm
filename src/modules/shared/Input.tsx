import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registerName: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}
export const Input = ({
  label,
  registerName,
  register,
  error,
  className,
  ...props
}: InputProps) => {
  return (
    <label className={clsx("flex flex-col gap-y-1", className)}>
      <span className="ml-5 text-sm text-palette-gray-500">{label}</span>
      <input
        className="px-5 py-3 border border-gray-200 rounded-lg"
        {...register(registerName)}
        {...props}
      />
      {error && (
        <span className="ml-5 text-xs text-red-600">{error.message}</span>
      )}
    </label>
  );
};

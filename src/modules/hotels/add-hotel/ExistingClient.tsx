import { Input } from "@/modules/shared/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/modules/shared/Button";
import { clsx } from "clsx";

const schema = z.object({
  hotelName: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

interface ExistingClientProps {
  submitLabel: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  loading: boolean;
}

export const ExistingClient = ({
  submitLabel,
  defaultValues,
  onSubmit,
  loading,
}: ExistingClientProps) => {
  const { handleSubmit, register, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <Input
        label="Nazwa hotelu"
        registerName="hotelName"
        register={register}
      />

      <Button
        disabled={!formState.isValid || loading}
        type="submit"
        className={clsx("w-full", loading && "animate-pulse")}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

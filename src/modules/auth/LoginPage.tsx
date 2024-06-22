"use client";

import { Input } from "@/modules/shared/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/modules/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLogin } from "@/modules/auth/auth.controller";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const router = useRouter();

  const { login } = useLogin();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "biuro@laqua.pl",
    },
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="w-[400px] p-5 bg-white rounded-2xl"
        onSubmit={handleSubmit((data) => login(data))}
      >
        <div className="w-full flex justify-center">
          <Image
            src="/laqua-logo.png"
            alt="L'aqua logo"
            width={120}
            height={100}
          />
        </div>

        <fieldset className="flex flex-col gap-y-5 mt-8 mb-4">
          <Input label="E-mail" registerName="email" register={register} />
          <Input
            label="Hasło"
            type="password"
            registerName="password"
            register={register}
          />
        </fieldset>

        <Button className="w-full" type="submit" disabled={!formState.isValid}>
          Zaloguj
        </Button>
      </form>
    </div>
  );
};

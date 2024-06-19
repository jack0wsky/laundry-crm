"use client";

import { Input } from "@/modules/shared/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/modules/shared/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { clientDB } from "@/modules/services/laundry.db";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

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
        onSubmit={handleSubmit(async (data) => {
          const { error } = await clientDB.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

          if (!error) {
            router.push("/");
          }
        })}
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

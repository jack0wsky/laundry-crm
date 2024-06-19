import { LoginPage } from "@/modules/auth/LoginPage";
import { clientDB } from "@/modules/services/laundry.db";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data } = await clientDB.auth.getSession();

  console.log('data', data)

  if (!!data.session) {
    console.log('redirecting')
    return redirect("/");
  }

  return <LoginPage />;
}

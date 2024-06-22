import { useCheckSession } from "@/modules/auth/auth.controller";

export const CurrentUser = () => {
  const { user } = useCheckSession();

  if (!user) return null;

  const host = user?.email?.split("@")[1];

  return (
    <div className="flex items-center gap-x-3 py-3 border-b border-b-white/10 mb-2">
      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
        <p className="uppercase text-white text-lg font-bold">
          {host?.slice(0, 1)}
        </p>
      </div>
      <p className="text-base text-white/80">{user?.email}</p>
    </div>
  );
};

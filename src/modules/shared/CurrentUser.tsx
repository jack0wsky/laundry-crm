import { useCheckSession, useLogout } from "@/modules/auth/auth.controller";
import { LogoutIcon } from "@/modules/shared/icons/logout.icon";

export const CurrentUser = () => {
  const { user } = useCheckSession();

  const { logout, isPending } = useLogout();

  if (!user) return null;

  const host = user?.email?.split("@")[1];

  return (
    <div className="flex items-center justify-between py-3 border-b border-b-white/10 mb-2">
      <div className="flex items-center gap-x-3">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
          <p className="uppercase text-white text-lg font-bold">
            {host?.slice(0, 1)}
          </p>
        </div>
        <p className="text-base text-white/80">{user?.email}</p>
      </div>

      <button
        className="text-white w-9 h-9 flex justify-center items-center bg-red-500/10 rounded-full hover:bg-red-500/30 transition-colors"
        disabled={isPending}
        onClick={() => logout()}
      >
        <LogoutIcon className="text-xl text-red-500" />
      </button>
    </div>
  );
};

import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useCheckSession } from "@/modules/auth/api/auth.controller";
import { User } from "@supabase/supabase-js";

export const AuthContext = createContext<{
  isLogged: boolean;
  user: User | undefined;
}>({
  isLogged: false,
  user: undefined,
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isLogged, setIsLogged] = useState(false);
  const { accessToken, user } = useCheckSession();

  useEffect(() => {
    setIsLogged(!!accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ isLogged, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useCheckSession } from "@/modules/auth/api/auth.controller";

export const AuthContext = createContext<{
  isLogged: boolean;
}>({
  isLogged: false,
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isLogged, setIsLogged] = useState(false);
  const { expiration, accessToken } = useCheckSession();

  useEffect(() => {
    setIsLogged(!!accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

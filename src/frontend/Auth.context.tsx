import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useCheckSession } from "@/frontend/api/auth.controller";

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

  console.log("is logged", isLogged);

  return (
    <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

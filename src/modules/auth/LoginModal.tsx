import { useEffect, useState } from "react";
import { useAuth } from "@/modules/auth/Auth.context";
import { Dialog } from "@headlessui/react";
import { useLogin } from "@/modules/auth/api/auth.controller";

export const LoginModal = () => {
  const [modalOpened, setModalOpened] = useState(true);
  const [email, setEmail] = useState("biuro@laqua.pl");
  const [password, setPassword] = useState("");
  const { isLogged } = useAuth();
  const { login } = useLogin();

  useEffect(() => {
    setModalOpened(!isLogged);
  }, []);

  if (isLogged) return null;

  return (
    <Dialog className="z-50 bg-gray-800" open onClose={() => {}}>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-900/80 p-4 text-white`}
      >
        <Dialog.Overlay />
        <Dialog.Panel className="min-w-[300px] bg-white rounded-2xl text-black p-4">
          <h1>Zaloguj się</h1>
          <label>
            <p>Email</p>
            <input
              type="email"
              value={email}
              disabled
              placeholder="email"
              className="px-2 py-1 border-2 w-full disabled:bg-gray-100 disabled:text-gray-500"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            <p>Hasło</p>
            <input
              type="password"
              value={password}
              className="px-2 py-1 border-2 w-full"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button onClick={() => login({ email, password })}>Zaloguj</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

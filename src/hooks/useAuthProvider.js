import { useState } from "react";

export default function useAuthProvider() {
  const [token, setToken] = useState(null);

  const logar = (userToken, callback) => {
    setToken(userToken);
    if (callback) callback();
  };

  const deslogar = callback => {
    setToken(null);
    if (callback) callback();
  };

  return {
    token,
    logar,
    deslogar,
  };
}

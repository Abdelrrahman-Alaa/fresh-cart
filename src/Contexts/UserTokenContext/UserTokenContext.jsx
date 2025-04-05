import { createContext, useState, useEffect } from "react";

export let userTokenContext = createContext();

export default function UserTokenContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <userTokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </userTokenContext.Provider>
  );
}

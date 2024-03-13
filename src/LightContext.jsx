import { createContext, useState } from "react";

const LightContext = createContext({
  ChangeTheme: () => {},
});

function LightContextProvider({ children }) {
  const [mode, setMode] = useState("light");

  function ChangeTheme() {
    setMode((pre) => (pre === "light" ? "dark" : "light"));
  }

  const LightCTX = {
    ChangeTheme: ChangeTheme,
    mode: mode,
  };

  return (
    <LightContext.Provider value={LightCTX}>{children}</LightContext.Provider>
  );
}

export { LightContext, LightContextProvider };

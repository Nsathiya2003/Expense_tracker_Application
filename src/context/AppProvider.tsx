import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";

export function AppProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  // const [errorMsg, setErrorMsg] = useState("");
  return (
    <AppContext.Provider value={{ open, setOpen }}>
      {children}
    </AppContext.Provider>
  );
}

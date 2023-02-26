import * as React from "react";
import { render } from "react-dom";

export function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

type ThemeContextType = {
  theme: string;
  setTheme: (value: string) => void;
};
export const [useTheme, CtxProvider] = createCtx<ThemeContextType>();

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = React.useState("white");

  React.useEffect(() => {
    // We'd get the theme from a web API / local storage in a real app
    // We've hardcoded the theme in our example
    const currentTheme = "lightblue";
    setTheme(currentTheme);
  }, []);

  return <CtxProvider value={{ theme, setTheme }}>{children}</CtxProvider>;
};

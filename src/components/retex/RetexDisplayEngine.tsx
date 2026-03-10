import { createContext, useState, ReactNode } from "react";
import { RetexContextType } from "../../assets/dataTypes";

const RetexContext = createContext<RetexContextType>({
  displayedRetexTitle: undefined,
  setDisplayedRetex: () => {},
});

const RetexDisplayEngine = ({ children }: { children: ReactNode }) => {
  const [displayedRetexTitle, setDisplayedRetex] = useState<string | undefined>(undefined);

  return (
    <RetexContext.Provider value={{ displayedRetexTitle, setDisplayedRetex }}>
      {children}
    </RetexContext.Provider>
  )
}

export { RetexContext, RetexDisplayEngine }

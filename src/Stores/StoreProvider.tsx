import { createContext, FC, ReactElement, ReactNode } from "react";
import { RootStore } from "./RootStore";

export type StoreComponent = FC<{
  store: RootStore;
  children: ReactNode;
}>;

export const StoreContext = createContext<RootStore>({} as RootStore);

export const StoreProvider: StoreComponent = ({
  children,
  store,
}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

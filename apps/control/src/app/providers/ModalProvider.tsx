import { useContext, createContext, ReactNode, FunctionComponent} from "react";
import { ModalProps } from "@nx/ui";

export const ModalContext = createContext({
  push(options: ModalProps) {}
});

export const useModals = () => {
  const actions = useContext(ModalContext)

  return actions;
}
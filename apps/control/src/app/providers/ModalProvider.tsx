import { useContext, createContext, ReactNode, FunctionComponent} from "react";

export interface ModalProps {
  component: FunctionComponent
  title: string;
  close?: () => void;
  onCancel?: () => void;
  onConfirm?: (data: any) => void;
  onLiveUpdate?: (data: any) => void;
  initialData?: any;
  data?: any;
}

export const ModalContext = createContext({
  push(options: ModalProps) {}
});

export const useModals = () => {
  const actions = useContext(ModalContext)

  return actions;
}
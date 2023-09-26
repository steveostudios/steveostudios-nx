import { useContext, createContext } from "react";
import { ModalProps } from "@nx/ui";

export const ModalContext = createContext({
	pushModal(options: ModalProps) {},
});

export const useModals = () => {
	const actions = useContext(ModalContext);

	return actions;
};

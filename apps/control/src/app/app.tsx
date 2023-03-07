import styled from '@emotion/styled';
import { ReactElement, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./app.css";
import Home from './routes/Home';
import SignIn from "./routes/SignIn"
import Account from './routes/Account';
import SignUp from './routes/SignUp';
import Manage from './routes/Manage';
import ProtectedRoute from './routes/ProtectedRoute';
// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { ContextMenu, ContextMenuProps, Modal } from '@nx/ui';
import { ModalContext } from './providers/ModalProvider';
import { ModalProps } from '@nx/ui';
import { Colors } from '@nx/style';
import { ContextMenuContext } from './providers/ContextMenuProvider';
library.add(fal, far, fas, fab);




const uid = (() => {
  let i = 0;
  return () => `${i++}`;
})();

export function App() { 
  const [modals, setModals] = useState<ReactElement[]>([]);
  const [contextMenu, setContextMenu] = useState<ReactElement | null>();

  const actions = useMemo(
    () => ({
      push(options: ModalProps) {
        const key = uid();
        console.log(key)
        const close = () => {
          setModals((modals) => {
            return modals.filter((modal) => modal.key !== key);
          });
        };

        const modal =
          <Modal key={key} close={close} {...options} />
        setModals((modals) => [...modals, modal]);
      }
    }),
    []
  );

  const ContextMenuActions = useMemo(
    () => ({
      addContextMenu(options: ContextMenuProps) {
        console.log(options)
        const close = () => {
          console.log("close")
          setContextMenu(null);
        };

        setContextMenu(<ContextMenu close={close} {...options} />);
      }
    }),
    []
  );

  return (
    <StyledApp>
      <Router>
          <ModalContext.Provider value={actions}>
            <ContextMenuContext.Provider value={ContextMenuActions}>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />              
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/manage" element={<Manage />} /> 
            </Routes>
            {modals}
            {contextMenu}
            </ContextMenuContext.Provider>
          </ModalContext.Provider>
      </Router>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled("div")({
  backgroundColor: Colors.gray10,
  height: "100vh",
  overflow: "hidden",
  width: "100%",
  margin: 0,
  padding: 0
})
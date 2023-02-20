import styled from '@emotion/styled';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./app.css";
import NxWelcome from './nx-welcome';
import Edit from './routes/Edit';
// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fal, far, fas, fab);


const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Router>
        <Routes>
        <Route path="/nx" element={<NxWelcome title="control" />} />
        <Route path="/edit" element={<Edit />} /> 
        </Routes>
      </Router>
    </StyledApp>
  );
}

export default App;

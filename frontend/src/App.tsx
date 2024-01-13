import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { MainPage } from "./pages/MainPage/MainPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

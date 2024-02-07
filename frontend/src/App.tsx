import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { GlobalStateProvider } from "./shared/globalState/GlobalStateProvider";
import { NotificationService } from "./shared/notifications/NotificationService";
import { MainPage } from "./pages/MainPage/MainPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <GlobalStateProvider>
      <NotificationService.ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;

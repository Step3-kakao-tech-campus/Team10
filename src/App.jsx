import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SalesManagementPage from "./pages/SalesManagementPage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/sales" element={<SalesManagementPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

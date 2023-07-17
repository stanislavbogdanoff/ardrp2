import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import WalletsTab from "./pages/dashboard/WalletsTab";
import TwittersTab from "./pages/dashboard/TwittersTab";
import EmailsTab from "./pages/dashboard/EmailsTab";
import UsersTab from "./pages/dashboard/UsersTab";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="body">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route path="/dashboard/wallets" element={<WalletsTab />} />
              <Route path="/dashboard/twitters" element={<TwittersTab />} />
              <Route path="/dashboard/emails" element={<EmailsTab />} />
              <Route path="/dashboard/users" element={<UsersTab />} />
            </Route>
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

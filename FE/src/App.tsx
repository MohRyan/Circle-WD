import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
import Threads from "./pages/Threads";
import ContactUs from "./pages/ContactUs";
import Search from "./pages/search";
import Follows from "./pages/follows";
import Profile from "./pages/profile";
import AuthPages from "./components/auth";
import { ReactNode } from "react";
import OtherProfile from "./pages/profile/component/OtherProfile";

const ProtectedRoute = ({ children }: {
  children: ReactNode
}) => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/" /> : children;
};

const PrivateRoute = ({ children }: {
  children: ReactNode
}) => {
  const token = localStorage.getItem('token')
  return !token ? <Navigate to="/auth" /> : children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={
            <ProtectedRoute>
              <AuthLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AuthPages />} />
          </Route>


          <Route path="/" element={<RootLayout />}>
            <Route index element={<Threads />} />
            <Route path="search" element={<PrivateRoute><Search /></PrivateRoute>} />
            <Route path="follows" element={<PrivateRoute><Follows /></PrivateRoute>} />
            <Route path="myProfile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="profile/:userId" element={<PrivateRoute><OtherProfile /></PrivateRoute>} />
            <Route path="contactUs" element={<PrivateRoute><ContactUs /></PrivateRoute>} />
            {/* <Route index element={<Parallax />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

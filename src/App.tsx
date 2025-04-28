import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SignIn from "./routes/SignIn";
import FirstTime from "./routes/FirstTime";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Notes from "./routes/Notes";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import Navbar from "./components/Navbar/Navbar";

function Authenticated({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

function RequireProfile({ children }: { children: JSX.Element }) {
  const { needsProfile } = useAuth();
  return needsProfile ? <Navigate to="/first-time" replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/first-time"
            element={
              <Authenticated>
                <FirstTime />
              </Authenticated>
            }
          />

          <Route
            path="/home"
            element={
              <Authenticated>
                <RequireProfile>
                  <Home />
                </RequireProfile>
              </Authenticated>
            }
          />
          <Route
            path="/profile"
            element={
              <Authenticated>
                <RequireProfile>
                  <Profile />
                </RequireProfile>
              </Authenticated>
            }
          />
          <Route
            path="/notes"
            element={
              <Authenticated>
                <RequireProfile>
                  <Notes />
                </RequireProfile>
              </Authenticated>
            }
          />

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

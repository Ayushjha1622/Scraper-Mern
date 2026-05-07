import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  AuthProvider,
} from "./context/AuthContext";

import AuthPage from "./pages/AuthPage";

import Home from "./pages/Home";

import Bookmarks from "./pages/Bookmarks";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={<AuthPage />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

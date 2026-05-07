import {
  Routes,
  Route,
} from "react-router-dom";

import AuthPage from "./pages/AuthPage";

import ProtectedRoute from "./components/ProtectedRoute";

const Home = () => {
  return <h1>Home</h1>;
};

const Bookmarks = () => {
  return <h1>Bookmarks</h1>;
};

const App = () => {
  return (
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
  );
};

export default App;
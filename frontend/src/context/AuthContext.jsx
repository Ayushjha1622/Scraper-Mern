import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    const storedToken =
      localStorage.getItem("token");

    if (
      storedUser &&
      storedToken
    ) {
      setUser(
        JSON.parse(storedUser)
      );

      setToken(storedToken);
    }
  }, []);

  const login = async (
    data
  ) => {
    return {
      success: true,
    };
  };

  const register = async (
    data
  ) => {
    return {
      success: true,
    };
  };

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null);

  const [bookmarks, setBookmarks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));

      fetchBookmarks();
    }
  }, []);

  const fetchBookmarks =
    async () => {
      try {
        const { data } =
          await API.get(
            "/api/stories/bookmarks/me"
          );

        setBookmarks(data);
      } catch (error) {
        console.log(error);
      }
    };

  const register = async (
    formData
  ) => {
    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/api/auth/register",
          formData
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      await fetchBookmarks();

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    formData
  ) => {
    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/api/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      await fetchBookmarks();

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();

    setUser(null);

    setBookmarks([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookmarks,
        loading,
        login,
        register,
        logout,
        fetchBookmarks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);

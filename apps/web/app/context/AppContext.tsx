"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  ReactElement,
} from "react";
import api from "../../lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  logOutUser: any;
}

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

const AppContext = createContext<AuthContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const currentPathName = usePathname();
  console.log(`Current pathname: ${currentPathName}`);

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const publicRoute = ["/", "/login", "/register", "/verify"];

  async function logOutUser() {
    try {
      const { data } = await api.post("/auth/logout");
      toast.success("LogOut SuccessFull");
      setIsAuth(false);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  useEffect(() => {
    const isPublicRoute = publicRoute.some(
      (route) => currentPathName === route || currentPathName.startsWith(route + "/")
    );

    const checkAuth = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("auth/me");
        setUser(data.user);
        setIsAuth(true);
        // If on login/register and authenticated, go to dashboard
        if (["/login", "/register"].includes(currentPathName)) {
          router.push("/dashboard");
        }
      } catch (error) {
        setUser(null);
        setIsAuth(false);
        // If on protected route and not authenticated, go to login
        if (!isPublicRoute) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [currentPathName, router]);

  return (
    <AppContext.Provider
      value={{ setIsAuth, isAuth, user, setUser, loading, logOutUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
import { fetchAccountApi } from "@/services/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

interface IAppContext {
  isAuthenticated: boolean,
  setIsAuthenticated: (v: boolean) => void,
  setUser: (v: IUser | null) => void,
  user: IUser | null;
  isAppLoading: boolean,
  setIsAppLoading: (v: boolean) => void;

}

const CurrentAppContext = createContext<IAppContext | null>(null);

interface IProps {
  children: React.ReactNode
}
export const AppProvider = (props: IProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Chưa đăng nhập
  const [user, setUser] = useState<IUser | null>(null); // Thong tin user
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true); // Đang tải

  useEffect(() => {
    fetchAccount();
  }, [])
  const fetchAccount = async () => {
    const res = await fetchAccountApi();
    if (res.data) {
      setUser(res.data.user)
      setIsAuthenticated(true); // Đã đăng nhập
    }
    setIsAppLoading(false); // Đã tải xong

  }
  return (
    <>
      {isAppLoading === false ?
        <CurrentAppContext value={{ isAuthenticated, user, setIsAuthenticated, setUser, isAppLoading, setIsAppLoading }}>
          {props.children}
        </CurrentAppContext>
        : <div style={{ position: "fixed", top: "50%", left: "50px" }}>
          <BeatLoader
            size={30} />
        </div>}
    </>
  )
};

export const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);
  if (!currentAppContext) {
    throw new Error(
      "useCurrentApp has to be used within <CurrentAppContext>",
    );
  }

  return currentAppContext;
};
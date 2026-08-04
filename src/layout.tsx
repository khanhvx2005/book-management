import { Outlet } from "react-router-dom"
import Header from "components/layout/header/header"
import Footer from "components/layout/footer/footer"
import { useCurrentApp } from "@/components/context/app.context";
import { fetchAccountApi } from "@/services/axios";
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";
function Layout() {
  const { user, setUser, isAppLoading, setIsAppLoading, setIsAuthenticated } = useCurrentApp();
  useEffect(() => {
    fetchAccount();
  }, [])
  const fetchAccount = async () => {
    const res = await fetchAccountApi();
    if (res.data) {
      setUser(res.data.user)
      setIsAuthenticated(true);
    }
    setIsAppLoading(false);

  }
  return (
    <>

      {isAppLoading === false ? (
        <>
          <Header />
          <Outlet />
          <Footer />
          <div>{JSON.stringify(user)}</div>
        </>
      ) : (
        <>
          <div style={{ position: "fixed", top: "50%", left: "50px" }}>
            <BeatLoader
              size={30} />
          </div>
        </>
      )}
    </>
  )
}

export default Layout;

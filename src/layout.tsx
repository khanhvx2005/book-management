import { Outlet } from "react-router-dom"
import Header from "components/layout/header/header"
import Footer from "components/layout/footer/footer"

function Layout() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;

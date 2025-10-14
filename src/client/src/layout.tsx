import { Outlet } from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full pb-20">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
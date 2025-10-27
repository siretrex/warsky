import { Outlet } from "react-router-dom"
import Navbar from "./pages/NavBar"
const Layout = () => {
  return (
    <>
    <Navbar/>
    <div><Outlet/></div>
    </>
  )
}

export default Layout
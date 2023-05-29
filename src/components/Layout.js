import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthProvider } from "context/AuthContext";

const Layout = () => {
    return(
        <div className="wrapper">
            <AuthProvider>
                <Navbar/>
                <Outlet/>
            </AuthProvider>
        </div>
    );
};
export default Layout;
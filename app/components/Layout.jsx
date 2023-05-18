import Footer from "./Footer";
import Navbar from "./Navbar";
import { AuthContext } from "../hooks/AuthContext";
import {useContext} from 'react'
import { useDispatch } from "react-redux";
import { addUsertoLocal } from "../redux/slices/auth";
import { Poppins } from "next/font/google";
const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500","600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap"
})
const Layout = ({ children }) => {
    const dispatch = useDispatch()
    const { user, logout, authredux } = useContext(AuthContext);

    {user ? dispatch(addUsertoLocal(user)) : null}
    return (
<>
<div className={poppins.className}>
    
<Navbar />
{children}
<Footer />
</div>
</>
)};

export default Layout;
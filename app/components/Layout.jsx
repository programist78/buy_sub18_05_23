import Footer from "./Footer";
import Navbar from "./Navbar";
import { AuthContext } from "../hooks/AuthContext";
import {useContext} from 'react'
import { useDispatch } from "react-redux";
import { addUsertoLocal } from "../redux/slices/auth";
import { DM_Sans } from "next/font/google";
const dm_sans = DM_Sans({
    weight: ["400", "500"],
    subsets: ["latin"],
    display: "swap"
})
const Layout = ({ children }) => {
    const dispatch = useDispatch()
    const { user, logout, authredux } = useContext(AuthContext);

    {user ? dispatch(addUsertoLocal(user)) : null}
    return (
<>
<div className={dm_sans.className}>
<Navbar />
{children}
<Footer />
</div>
</>
)};

export default Layout;
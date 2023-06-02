import Footer from "./Footer";
import Navbar from "./Navbar";
import { AuthContext } from "../hooks/AuthContext";
import {useContext} from 'react'
import { useDispatch } from "react-redux";
import { addUsertoLocal } from "../redux/slices/auth";
import styles from '../styles/Home.module.scss'
import Image from "next/image";
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
<div style={{overflow: "hidden"}}>
<div className={dm_sans.className}>
{/* <Image src="/v1.svg" width={1049} height={615} className={styles.vector1}/>
      <Image src="/v2.svg" width={743} height={747} className={styles.vector2}/>
      <Image src="/v3.svg" width={1236} height={1091} className={styles.vector3}/>
      <Image src="/v4.svg" width={1049} height={1319} className={styles.vector4}/>
      <Image src="/v5.svg" width={1051} height={1054} className={styles.vector5}/> */}
<Navbar />
{children}
<Footer />
</div>
</div>
)};

export default Layout;
import Footer from "./Footer";
import Navbar from "./Navbar";
import { AuthContext } from "../hooks/AuthContext";
import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { addUsertoLocal, setToken } from "../redux/slices/auth";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { GETUSER_BYTOKEN } from "../apollo/auth";
import { setUserInfo } from "../redux/slices/userInfo";
import { useRouter } from "next/router";
const dm_sans = DM_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});
const Layout = ({ children }) => {
  const router = useRouter();
  const { auth } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const { user, logout, authredux } = useContext(AuthContext);
  const { data, error, loading } = useQuery(GETUSER_BYTOKEN, {
    variables: { token: user },
  });
  useEffect(() => {
    if (data?.getUserbyToken) {
      dispatch(setUserInfo(data?.getUserbyToken));
    }
  }, [data?.getUserbyToken]);
  useEffect(() => {
    if (user) {
      dispatch(setToken(user));
    }
  }, [user]);

  return (
    <div style={{ overflow: "hidden" }}>
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
  );
};

export default Layout;

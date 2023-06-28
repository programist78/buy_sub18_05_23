import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import { useRouter } from "next/router";
import { useSpring, animated } from "@react-spring/web";
import { clearToken } from "../../redux/slices/auth";
import { clearUserInfo } from "../../redux/slices/userInfo";

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.userInfo);
  const { user, logout, authredux } = useContext(AuthContext);
  const [isOpen, toggle] = useState(false);
  const [open, setOpen] = useState("");
  function ChangeMenu() {
    setOpen(!open);
  }

  const first = useSpring({
    transform: isOpen
      ? "translate(5px, 32px) rotate(-45deg)"
      : "translate(2px, 7px) rotate(0deg)",
  });
  const second = useSpring({
    transform: isOpen
      ? "translate(10px, 4px) rotate(45deg)"
      : "translate(2px, 19px) rotate(0deg)",
  });
  const third = useSpring({
    transform: isOpen
      ? "translate(5px, 32px) rotate(-45deg)"
      : "translate(2px, 31px) rotate(0deg)",
  });
  const router = useRouter();
  const { auth } = useSelector((state) => state.auth);
  const onLogout = () => {
    router.push("/");
    logout();
    clearToken(), clearUserInfo();
    document.location.reload();
  };
  return (
    <div className={styles.back}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" width={150} height={150} alt="logo" />
        </Link>
      </div>
      {
        isOpen ? (
          <div className={styles.backmenu}>
            <div>
              {/* <CgMenuMotion onClick={() => toggle(!isOpen)} className={styles.burger2}/> */}
              <svg
                onClick={() => toggle(!isOpen)}
                width="40"
                height="32"
                viewBox="0 0 44 44"
                fill="#000000"
                className={styles.animate_burger2}
                xmlns="http://www.w3.org/2000/svg"
              >
                <animated.rect width="40" height="4" rx="2" style={first} />
                <animated.rect width="40" height="4" rx="2" style={second} />
                <animated.rect width="40" height="4" rx="2" style={third} />
              </svg>
            </div>
            {userInfo ? (
              <div className={styles.info_links}>
                {/* <Link href="/auth/poster-sign-up"> <button className='a_button'>Sign Up Posters</button></Link>
     <Link href="/auth/business-sign-up"> <button className='a_button'>Sign Up Businesses</button></Link> */}
                {userInfo.role == "BUSINESS" && (
                  <Link href="/personal/business">
                    {" "}
                    <button className="a_button">Business panel</button>
                  </Link>
                )}
                {userInfo.role == "USER" && (
                  <Link href="/personal/poster">
                    {" "}
                    <button className="a_button">Poster panel</button>
                  </Link>
                )}
                {userInfo.role == "ADMIN" && (
                  <Link href="/personal/poster">
                    {" "}
                    <button className="a_button">Admin panel</button>
                  </Link>
                )}
                <button className="b_button" onClick={onLogout}>
                  Log out
                </button>
              </div>
            ) : (
              <div className={styles.info_links}>
                <Link href="/auth/poster-sign-up">
                  {" "}
                  <button className="a_button">Sign Up Posters</button>
                </Link>
                <Link href="/auth/business-sign-up">
                  {" "}
                  <button className="a_button">Sign Up Businesses</button>
                </Link>
                <Link href="/auth/login">
                  <button className="b_button">Log in</button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.premenu}>
            <svg
              onClick={() => toggle(!isOpen)}
              width="40"
              height="32"
              viewBox="0 0 44 44"
              fill="#000000"
              className={styles.animate_burger}
              xmlns="http://www.w3.org/2000/svg"
            >
              <animated.rect width="40" height="4" rx="2" style={first} />
              <animated.rect width="40" height="4" rx="2" style={second} />
              <animated.rect width="40" height="4" rx="2" style={third} />
            </svg>
          </div>
        )
        // <CgMenu className={styles.burger} onClick={() => setIsOpenMenu(!isOpenMenu)}/>
      }
      {userInfo ? (
        <div className={styles.links}>
          {/* <Link href="/auth/poster-sign-up"> <button className='a_button'>Sign Up Posters</button></Link>
     <Link href="/auth/business-sign-up"> <button className='a_button'>Sign Up Businesses</button></Link> */}
          {userInfo.role == "BUSINESS" && (
            <Link href="/personal/business">
              {" "}
              <button className="a_button">Personal panel</button>
            </Link>
          )}
          {userInfo.role == "USER" && (
            <Link href="/personal/poster">
              {" "}
              <button className="a_button">Personal panel</button>
            </Link>
          )}
          {userInfo.role == "ADMIN" && (
            <Link href="/personal/admin">
              {" "}
              <button className="a_button">Personal panel</button>
            </Link>
          )}
          <button className="b_button" onClick={onLogout}>
            Log out
          </button>
        </div>
      ) : (
        <div className={styles.links}>
          <Link href="/auth/poster-sign-up">
            {" "}
            <button className="a_button">Sign Up Posters</button>
          </Link>
          <Link href="/auth/business-sign-up">
            {" "}
            <button className="a_button">Sign Up Businesses</button>
          </Link>
          <Link href="/auth/login">
            <button className="b_button">Log in</button>
          </Link>
        </div>
      )}
    </div>
  );
}

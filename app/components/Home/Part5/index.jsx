import Image from "next/image";
import styles from "./Part5.module.scss";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Part5() {
  const { userInfo } = useSelector((auth) => auth.userInfo);

  return (
    <div className={styles.back}>
      <div className={styles.part1}>
        <p className={`text ${styles.text}`}>
          At Postfordollars we feel the best from of advertising is from world
          of mouth so we help you use others socials media presence to do just
          that. Click the button below to learn more and Sign Up!
        </p>
        {userInfo ? (
          <Link href={userInfo?.role == "USER" ? "/personal/poster" : ""}>
            <button className="b_button">Personal Panel</button>
          </Link>
        ) : (
          <Link href="/auth/business-sign-up">
            <button className="b_button">Sign Up Businesses</button>
          </Link>
        )}
        {/* <button className="b_button">Log In Now</button> */}
      </div>
    </div>
  );
}

import Link from "next/link";
import styles from "./Footer.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.back}>
      {/* <Image src="/v1.svg" width={1049} height={615} className={styles.vector1}/>
            <Image src="/v3.svg" width={1236} height={1091} className={styles.vector3}/> */}
      <div className={styles.line} />
      <div className={styles.info}>
        <div className={styles.part1}>
          <Image src="/logo.svg" alt="logo" width={98} height={98} />
          <div className={styles.icons}>
            <Image
              src="/instagram_black.svg"
              alt="instagram"
              width={30}
              height={30}
            />
            <Image
              src="/twitter_black.svg"
              alt="twitter"
              width={30}
              height={30}
            />
            <Image
              src="/facebook_black.svg"
              alt="facebook"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className={styles.part2}>
          <Link href="/auth/business-sign-up">
            <p className="footer_text">Sign up Businesses</p>
          </Link>
          <Link href="/auth/poster-sign-up">
            <p className="footer_text">Sign up Posters</p>
          </Link>
          <Link href="/auth/login">
            <p className="footer_text">Log in</p>
          </Link>
          <Link href="/#contact_us">
            <p className="footer_text">Contact us</p>
          </Link>
          <Link href="/#about_us">
            <p className="footer_text">About us</p>
          </Link>
          <p className="footer_text">Privacy</p>
        </div>
        <div className={styles.part3}>
          <p className="footer_text">PFD LLC</p>
          {/* <p className="footer_text">12345 W.Ocean Street</p> */}
          {/* <p className="footer_text">Ste 1234W #20</p> */}
          {/* <p className="footer_text">California, CA OOO123</p> */}
          <p className="footer_text">info@postfordollars.com</p>
          {/* <p>800 123 5555</p> */}
        </div>
      </div>
      <div className={`${styles.line} ${styles.second}`} />
      <p className={styles.small_info}>© 2023 by PFD LLC</p>
    </div>
  );
}

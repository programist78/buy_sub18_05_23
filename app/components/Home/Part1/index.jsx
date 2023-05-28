import Image from "next/image";
import styles from "./Part1.module.scss";

export default function Part1() {
  return (
    <div className={styles.back}>
      <p className="title" style={{ textTransform: "uppercase" }}>
        Your voice is always important!
      </p>
      <div className={styles.obj}>
        <div className={styles.circle}>
            <Image src="/likes.svg" alt="." width={82} height={54}/>
            <p className="text" style={{fontWeight: "500"}}>Get crazy active !</p>
        </div>
        <div className={styles.image}>
            <Image src="/girl_1.webp" alt="earn" width={470} height={470}/>
        </div>
        <div className={styles.circle}>
            <Image src="/likes_sub.svg" alt="." width={82} height={54}/>
            <p className="text" style={{fontWeight: "500"}}>Start PR now!</p>
        </div>
      </div>
      <button className="b_button">Start now</button>
    </div>
  );
}

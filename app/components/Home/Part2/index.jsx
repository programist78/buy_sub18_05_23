import Image from "next/image";
import styles from "./Part2.module.scss";

export default function Part2() {
  return (
    <div className={styles.back}>
      <div className={styles.part1}>
          <p className={`title ${styles.title}`}>Meet the Postfordollars Platform For Brands!</p>
          <p className={`text ${styles.text}`}>
          Your customers will constantly want to post information about your brand on social media!Lorem ipsum dolor sit amet, consectetur adipiscing elit!
          </p>
          <div className={styles.media}>
            <Image src="/facebook.svg" alt="." width={88} height={88}/>
            <Image src="/instagram.svg" alt="." width={88} height={88}/>
            <Image src="/tiktok.svg" alt="." width={88} height={88}style={{borderRadius: "50%"}}/>
          </div>
      </div>
      <div className={styles.line} />
      <div className={styles.part2}>
        <Image src="/circle_people.webp" width={470} height={470}/>
        <div className={styles.boxes}>
        <div className={styles.box1_circle}>
            <div className={styles.circle}>
                <Image src="/heart.svg" width={70} height={70}/>
                <p className="text" style={{fontWeight: "500"}}>Approve Posts</p>
            </div>
            <div className={styles.circle}>
                <Image src="/trending-up.svg" width={70} height={70}/>
                <p className="text" style={{fontWeight: "500"}}>Feel the balance</p>
            </div>
        </div>
        <div className={styles.box2_circle}>
            <div className={styles.circle}>
                <Image src="/save.svg" width={70} height={70}/>
                <p className="text" style={{fontWeight: "500"}}>Save Resources</p>
            </div>
            <div className={styles.circle}>
                <Image src="/smile.svg" width={70} height={70}/>
                <p className="text" style={{fontWeight: "500"}}>Measure the possibilities</p>
            </div>
        </div>
        </div>
        <p  className={`text ${styles.text2}`}>Very soon after the first actions, you will start receiving the first results and income!</p>
        <button className="b_button">Start now</button>
      </div>
    </div>
  );
}

import Image from "next/image";
import styles from "./Part2.module.scss";

export default function Part2() {
  return (
    <div className={styles.back}>
      <div className={styles.part1}>
        <p className={`title ${styles.title}`}>
          Meet the Postfordollars Platform For Businesses!
        </p>
        <p className={`text ${styles.text}`}>
          Your customers will constantly want to post information about your
          business on social media!
        </p>
        <div className={styles.media}>
          <Image src="/facebook.svg" alt="." width={88} height={88} />
          <Image src="/instagram.svg" alt="." width={88} height={88} />
          <Image
            src="/tiktok.svg"
            alt="."
            width={88}
            height={88}
            style={{ borderRadius: "50%" }}
          />
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles.part2}>
        {/* <Image src="/circle_people.webp" width={470} height={470}/> */}
        {/* <div className={styles.boxes}>
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
        </div> */}
        <div className={styles.borderbox}>
          <p className={`text`}>
            Your customers will constantly want to post about you on social
            media to their friends and fans. With the POSTFORDOLLARS platform
            you set a fixed price you pay creators. We show you the creators
            post and review prior to your approval to pay. Stop using any time
            with no cancellation fee, simple and easy.
          </p>
        </div>
        {/* <p className={`text ${styles.text2}`}>
          Very soon after the first actions, you will start receiving the first
          results and income!
        </p> */}
        {/* <button className="b_button">Start now</button> */}
      </div>
    </div>
  );
}

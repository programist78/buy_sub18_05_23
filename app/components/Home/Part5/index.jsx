import Image from 'next/image'
import styles from './Part5.module.scss'

export default function Part5() {
  return (
    <div className={styles.back}>
        <div className={styles.part1}>
            <p className={`text ${styles.text}`}>At Postfordollars we feel the best from of advertising is from world of mouth so we help you use others socials media presence to do just that.
Click the button below to learn more and Sign Up!</p>
            <button className="b_button">Log In Now</button>
        </div>
    </div>
  )
}

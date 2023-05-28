import Image from 'next/image'
import styles from './Part5.module.scss'

export default function Part5() {
  return (
    <div className={styles.back}>
        <div className={styles.part1}>
            <p className={`text ${styles.text}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac volutpat erat. Proin fermentum cursus elit, in mollis urna semper quis. Aenean tristique tempor tempor. Fusce imperdiet venenatis massa, a vehicula leo tincidunt commodo. Donec bibendum efficitur ipsum, vel ultricies mauris efficitur quis. Cras posuere vestibulum luctus.</p>
            <button className="b_button">Start Now</button>
        </div>
        <Image width={501} height={492} alt='illustration' src="/phone.webp"/>
    </div>
  )
}

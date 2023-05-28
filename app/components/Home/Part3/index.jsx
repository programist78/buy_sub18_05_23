import Image from 'next/image'
import styles from './Part3.module.scss'

export default function Part3() {
  return (
    <div className={styles.back}>
        <p className='title'>
            We use trust
        </p>
        <Image src="/peoples_3.webp" width={668} height={668}/>
        <p className={`text ${styles.text}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac volutpat erat. Proin fermentum cursus elit, in mollis urna semper quis. Aenean tristique tempor tempor. Fusce imperdiet venenatis massa, a vehicula leo tincidunt commodo. Donec bibendum efficitur ipsum, vel ultricies mauris efficitur quis.</p>
        <button className="b_button">Start now</button>
    </div>
  )
}

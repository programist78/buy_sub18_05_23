import Image from 'next/image'
import styles from './Part6.module.scss'

export default function Part6() {
  return (
    <div className={styles.back}>
        {/* <p className={`title ${styles.title}`}>Stay in touch with us!</p> */}
        {/* <p className={`text ${styles.text}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac volutpat erat. Proin fermentum cursus elit, in mollis urna semper quis. Aenean tristique tempor tempor.</p> */}
        <Image src="/custom_mail.svg" width={132} height={132}/>
        <div className={styles.inputs}>
            <input type="text" placeholder='Your Email'/>
            <input type="text" placeholder='Message...'/>
            <button className='b_button'>Send</button>
        </div>
    </div>
  )
}

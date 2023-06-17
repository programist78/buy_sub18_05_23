import Link from 'next/link'
import styles from './NoAccess.module.scss'

export default function UnAuth() {
  return (
    <div className={styles.back}>
        <p className='title'>Please log in to your account or register for access</p>
        <Link href="/auth/login"><button className='b_button'>Log in</button></Link>
    </div>
  )
}

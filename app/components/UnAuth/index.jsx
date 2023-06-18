import Link from 'next/link'
import styles from './NoAccess.module.scss'
import CustomHead from '../CustomHead';

export default function UnAuth() {
  const pageTitle = "Postfordollars - Achieve more with us!";
  const pageDescription =
    "Welcome to PostForDollars - the ultimate platform that connects posters and businesses for mutually beneficial collaborations! Whether you're a business looking to promote your products or services or a poster seeking opportunities to earn rewards, PostForDollars is here to help.";
  
  return (
    <>
      <CustomHead pageTitle={pageTitle} pageDescription={pageDescription} />
    <div className={styles.back}>
        <p className='title'>Please log in to your account or register for access</p>
        <Link href="/auth/login"><button className='b_button'>Log in</button></Link>
    </div>
    </>
  )
}

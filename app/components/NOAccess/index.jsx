import CustomHead from '../CustomHead'
import styles from './NoAccess.module.scss'

export default function NoAccess() {
  const pageTitle = "Postfordollars - Achieve more with us!";
  const pageDescription =
    "Welcome to PostForDollars - the ultimate platform that connects posters and businesses for mutually beneficial collaborations! Whether you're a business looking to promote your products or services or a poster seeking opportunities to earn rewards, PostForDollars is here to help.";

  return (
    <>
          <CustomHead title={pageTitle} description={pageDescription} />
    <div className={styles.back}>
        <p className='title'>You don’t have access to this page</p>
    </div>
    </>
  )
}

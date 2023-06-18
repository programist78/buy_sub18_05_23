import CustomHead from "../../CustomHead";
import styles from "./BigLoader.module.scss";

export default function BigLoader() {
  const pageTitle = "Postfordollars - Achieve more with us!";
  const pageDescription =
    "Welcome to PostForDollars - the ultimate platform that connects posters and businesses for mutually beneficial collaborations! Whether you're a business looking to promote your products or services or a poster seeking opportunities to earn rewards, PostForDollars is here to help.";

  return (
  <>
  <CustomHead pageTitle={pageTitle} pageDescription={pageDescription} />
  
  <div className={styles.back}> <span className={styles.loader}></span> </div>
  </>)
}

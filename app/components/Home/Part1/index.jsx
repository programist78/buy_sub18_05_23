import Image from "next/image";
import styles from "./Part1.module.scss";
import { useState, useEffect } from "react";
export default function Part1() {
  const [containerSize, setContainerSize] = useState();

  // const debouncedHandleResize = debounce(handleResize, 100);
console.log(containerSize)
  useEffect(() => {
    setContainerSize({
      width: window.innerWidth,
    });
  }, [window])
  return (
    <div className={styles.back}>
      <p className="title" style={{ textTransform: "uppercase" }}>
        Your voice is always important!
      </p>
      <div className={styles.obj}>
        {(containerSize?.width < 768 ) 
        ?
        <>
    <div className={styles.image}>
        <Image src="/girl_1.webp" alt="earn" width={470} height={470}/>
    </div>
    <div className={styles.row}>
    <div className={styles.circle}>
        <Image src="/likes_sub.svg" alt="." width={82} height={54}/>
        <p className="text" style={{fontWeight: "500"}}>Start PR now!</p>
    </div>
    <div className={styles.circle}>
        <Image src="/likes.svg" alt="." width={82} height={54}/>
        <p className="text" style={{fontWeight: "500"}}>Get crazy active !</p>
    </div>
    </div>
    </>
        :
        <>
        <div className={styles.circle}>
        <Image src="/likes.svg" alt="." width={82} height={54}/>
        <p className="text" style={{fontWeight: "500"}}>Get crazy active !</p>
    </div>
    <div className={styles.image}>
        <Image src="/girl_1.webp" alt="earn" width={470} height={470}/>
    </div>
    <div className={styles.circle}>
        <Image src="/likes_sub.svg" alt="." width={82} height={54}/>
        <p className="text" style={{fontWeight: "500"}}>Start PR now!</p>
    </div>
    </>
      }

      </div>
      <button className="b_button">Log In now</button>
    </div>
  );
}

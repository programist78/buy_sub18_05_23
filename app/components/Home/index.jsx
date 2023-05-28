import Part1 from "./Part1";
import styles from '../../styles/Home.module.scss'
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import Part5 from "./Part5";
import Part6 from "./Part6";
import Image from "next/image";
export default function HomeCom() {
  return (
    <div className={styles.back}>
      <Image src="/v1.svg" width={1049} height={615} className={styles.vector1}/>
      <Image src="/v2.svg" width={743} height={747} className={styles.vector2}/>
      <Image src="/v3.svg" width={1236} height={1091} className={styles.vector3}/>
      <Image src="/v4.svg" width={1049} height={1319} className={styles.vector4}/>
      <Image src="/v5.svg" width={1051} height={1054} className={styles.vector5}/>

        <Part1 />
        <Part2 />
        <Part3 />
        <Part4 />
        <Part5 />
        <Part6 />
    </div>
  )
}

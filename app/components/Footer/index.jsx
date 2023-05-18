import Link from 'next/link'
import styles from './Footer.module.scss'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className={styles.back}>
      <div className={styles.center}>
        <a href='instagram.com/'><Image src="/inst.svg" alt='.' width={35} height={35}/></a>
        <a href='youtube.com/'> <Image src="/youtube.svg" alt='.' width={40} height={35}/></a>
        <a href='youtube.com/'> <Image src="/tg.svg" alt='.' width={35} height={35}/></a>
      </div>
      <Link href="/"><p className={styles.logo}>Expat Path</p></Link>
      <div className={styles.center}>
      <Link href="/#resources"><p>Resources</p></Link>
        <Link href="/about"><p>About</p></Link>
      </div>
    </div>
  )
}

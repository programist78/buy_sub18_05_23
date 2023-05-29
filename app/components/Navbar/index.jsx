import Link from 'next/link'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../hooks/AuthContext'
import { useRouter } from 'next/router'
import { useSpring, animated } from '@react-spring/web'

export default function Navbar() {
  const { user, logout, authredux } = useContext(AuthContext);
  const [isOpen, toggle] = useState(false)
  const [open, setOpen] = useState("")
  function ChangeMenu() {
    setOpen(!open)
  }

  const first = useSpring({
    transform: isOpen
      ? "translate(5px, 32px) rotate(-45deg)"
      : "translate(2px, 7px) rotate(0deg)"
  });
  const second = useSpring({
    transform: isOpen
      ? "translate(10px, 4px) rotate(45deg)"
      : "translate(2px, 19px) rotate(0deg)"
  });
  const third = useSpring({
    transform: isOpen
      ? "translate(5px, 32px) rotate(-45deg)"
      : "translate(2px, 31px) rotate(0deg)"
  });
  const router = useRouter()
  const {auth} = useSelector((state) => state.auth);
  const onLogout = () => {
    logout();
    router.push('/')
    document.location.reload();
}
  return (
  <div className={styles.back}>
    <div className={styles.logo}>
      <Image src="/logo.svg" width={100} height={100}/>
    </div>
    <div className={styles.links}>
      <Link href="/businesses" className='nav_text'>Businesses</Link>
      <Link href="/login" className='nav_text'>Log in</Link>
      <button className='b_button'>Sign Up Now</button>
    </div>
  </div>
    )
}

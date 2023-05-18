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
      <Link href="/"><div className={styles.logo}>Expat Path</div></Link>
      <div className={styles.center}>
        {auth && 
        <div style={{display: "flex", flexDirection:"column"}}>
        <p onClick={onLogout} >Logout</p>
      <Link href="/admin/createpost"><p>Create</p></Link></div>}
        <Link href="#resources"><p>Resources</p></Link>
        <Link href="/about"><p>About</p></Link>
      </div>
      <div className={styles.contact}>
      <Link href="/contact"><div className={styles.contact_part}><p>Contact</p></div></Link>
        <div className={styles.calendar_box}><Image src="/calendar.svg" alt='.' width={39} height={39}/></div>
      </div>
      {isOpen ?
        <>
         <div className={styles.premenu}>
      </div>
      <div className={styles.backmenu}>
        <div>
          {/* <CgMenuMotion onClick={() => toggle(!isOpen)} className={styles.burger2}/> */}
          <svg
        onClick={() => toggle(!isOpen)}
        width="40"
        height="32"
        viewBox="0 0 44 44"
        fill="#000000"
        className={styles.animate_burger2}
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.rect width="40" height="4" rx="2" style={first} />
        <animated.rect width="40" height="4" rx="2" style={second} />
        <animated.rect width="40" height="4" rx="2" style={third} />
      </svg>
      </div>
         <div className={styles.info_links}>
         <Link prefetch={false} href="/#resources"><div>Resources</div></Link>
          <Link prefetch={false} href="/about"><div>About</div></Link>
          <Link prefetch={false} href="/contact"><div>Contact</div></Link>
          <div className={styles.box_contacts}>
            <div className={styles.first_child}>
            <a href='https://t.me/webXwizard'><div><Image src="/tg.svg" alt='.' width={40} height={40}/></div></a>
            <a href='https://www.instagram.com/web.x.wiz/'><div><Image src="/youtube.svg" alt='.' width={40} height={40}/></div></a>
            <a href='https://wa.me/380938036791'><div><Image src="/inst.svg" alt='.' width={40} height={40}/></div></a>
            </div>
          </div>
         </div>
        </div>
        </>
      
        :
        <div className={styles.premenu}>
        <svg
        onClick={() => toggle(!isOpen)}
        width="40"
        height="32"
        viewBox="0 0 44 44"
        fill="#000000"
        className={styles.animate_burger}
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.rect width="40" height="4" rx="2" style={first} />
        <animated.rect width="40" height="4" rx="2" style={second} />
        <animated.rect width="40" height="4" rx="2" style={third} />
      </svg>
      </div>
        // <CgMenu className={styles.burger} onClick={() => setIsOpenMenu(!isOpenMenu)}/>  
      }
      {/* </animated.div> */}
    {/* </animated.div> */}
    {/* </div> */}
     {/* </div> */}
    {/* </div> */}
    </div>
    
  )
}

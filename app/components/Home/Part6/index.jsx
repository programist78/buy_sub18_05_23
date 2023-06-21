import Image from "next/image";
import styles from "./Part6.module.scss";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Part6() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    Swal.fire({
      icon: "success",
      title: `Sending...`,
    });
    setEmail("")
    setMessage("")
  };

  return (
    <div className={styles.back} id="contact_us">
      {/* <p className={`title ${styles.title}`}>Stay in touch with us!</p> */}
      {/* <p className={`text ${styles.text}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac volutpat erat. Proin fermentum cursus elit, in mollis urna semper quis. Aenean tristique tempor tempor.</p> */}
      <Image src="/custom_mail.svg" width={132} height={132} alt="mail" />
      <form onSubmit={handleSubmit} className={styles.inputs}>
        <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} required  placeholder="Your Email" />
        <input value={message} type="text" onChange={(e) => setMessage(e.target.value)} required placeholder="Message..." />
        <button type="submit"  className="b_button">Send</button>
      </form>
    </div>
  );
}

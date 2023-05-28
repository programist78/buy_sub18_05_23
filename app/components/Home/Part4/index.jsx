import styles from './Part4.module.scss'

export default function Part4() {
  return (
    <div className={styles.back}>
        <p className={`title ${styles.title}`}>What do our clients think?</p>
        <div className={styles.comment}>
            <p className={`text ${styles.text}`}>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac volutpat erat. Proin fermentum cursus elit, in mollis urna semper quis. Aenean tristique tempor tempor.”</p>
            <div className={styles.description}>
                <p>-Mary Smith</p>
                <p>Owner of "Happy Days Store"</p>
            </div>
            <div className={styles.dots}>
                <div className={styles.active} />
                <div className={styles.unactive} />
                <div className={styles.unactive} />
            </div>
        </div>
    </div>
  )
}

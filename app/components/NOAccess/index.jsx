import styles from './NoAccess.module.scss'

export default function NoAccess() {
  return (
    <div className={styles.back}>
        <p className='title'>You don’t have access to this page</p>
    </div>
  )
}

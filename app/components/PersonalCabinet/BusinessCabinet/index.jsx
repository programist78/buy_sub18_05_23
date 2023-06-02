import Image from 'next/image'
import styles from './BusinessCabinet.module.scss'

export default function BusinessCabinetCom() {
  return (
    <div className={styles.back}>
        <p className='title'>My account Page</p>
        <div className={styles.part1}>
            <div className={styles.logo_part}>
                <p className={`text ${styles.text}`}>
                    Business Name
                </p>
                <Image src="/fake_logo.svg" alt='logo' width={139} height={139}/>
                <p className={`navtext ${styles.navtext}`}>
                    Business Name
                </p>
            </div>
            <div className={styles.info_part}>
                <p className='pretitle'>Posts Status</p>
                <div className={styles.row_part}>
                <div className={`a_input ${styles.statistic_div}`} >
                    <p className='text'>Posts awaiting approval</p>
                    <p className='text'>2</p>
                </div>
                <button className='b_button'>View</button>
                </div>
                <div className={styles.row_part}>
                <div className={`a_input ${styles.statistic_div}`} >
                    <p className='text'>Posts awaiting approval</p>
                    <p className='text'>2</p>
                </div>                
                <button className='b_button'>View</button>
                </div>
            </div>
        </div>
        <div className={styles.payment_part}>
            <div className={styles.pay_box}>
            <p className={`navtext ${styles.navtext}`}>
            If you use paypal and or others, you must first register in these payment systems and then proceed to payment.
                </p>
                <input type="text" className='a_input' />
                <div className={styles.inputs}>
                <input type="text" className={`a_input ${styles.customone}`}/>
                <input type="text" className={`a_input ${styles.customone}`}/>
                </div>
            </div>
            <button className='b_button'>Change payment information</button>
        </div>
        <p className='pretitle'>Statistic of your monthly expenses</p>
        <div className={styles.statistic_box}>
            <p className='text'>Your number of monthly posts</p>
            <p className='text'>Your brand activity is 76% higher than last month!</p>
        </div>
        <button className='b_button'>Accounting information</button>
    </div>
  )
}

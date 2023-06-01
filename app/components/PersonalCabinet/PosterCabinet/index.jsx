import Image from 'next/image'
import styles from '../PersonalCabinet.module.scss'

export default function PosterCabinetCom() {
  return (
    <div className={styles.back}>
        <p className="title">Let's get posting</p>
        <div className={styles.inline_part}>
            <div className={styles.log_part}>
                <Image src="/fake_logo.svg" width={139} height={139}/>
                <div className={styles.child_log_part}>
                    <p className="text">User 1</p>
                    <div className={`text ${styles.addborders}`}>User 1</div>
                    <p className="text">Sign Out</p>
                </div>
            </div>
            <div className={styles.select_brand_part}>
                <div className={styles.row_part}>
                    <div className={styles.input_part}>
                <p className='nav_text'>Selected brand</p>
                <input type="text" className='a_input' />
                </div>
                <button className='b_button'>Upload from the map</button>
                </div>
                <div className={styles.row_part}>
                <p className='nav_text'>Payment for the completed tasts</p>
                <button className='a_button'>10$</button>
                </div>
            </div>
        </div>
        <p className="pretitle">Post</p>
        <div className={styles.social_box}>
            <p className='nav_text'>Select a social</p>
            <div className={styles.social_part}>
                <Image src="/instagram.svg" alt='instagram' width={65} height={65}/>
                <Image src="/facebook.svg" alt='facebook' width={65} height={65}/>
                <Image src="/tiktok.svg" alt='tik-tok' width={65} height={65}/>
            </div>
            <div className={styles.download_part}>
            <Image src="/file_download.svg" width={66} height={66} alt='.'/>
            <p>Download your Review  Screenshot </p>
            <button className='b_button'>Download</button>
            </div>
            <p className='nav_text'>Select a Review Site</p>
            <div className={styles.review_part}>
                <Image src="/google.svg" alt='google' width={40} height={40}/>
                <Image src="/yelp.svg" alt='facebook' width={40} height={40}/>
                <Image src="/tripadvisor.svg" alt='tik-tok' width={40} height={40}/>
            </div>
            <div className={styles.download_part}>
            <Image src="/file_download.svg" width={66} height={66} alt='.'/>
            <p>Download your Review  Screenshot </p>
            <button className='b_button'>Download</button>
            </div>
            <button className='b_button'>Complete</button>
        </div>
        <p className="title">Businesses</p>
        {/* <BusinessPart /> */}
    </div>
  )
}

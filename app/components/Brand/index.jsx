import Image from 'next/image'
import styles from './Brand.module.scss'

export default function BrandPageCom() {
  return (
    <div className={styles.back}>
        <div className={styles.header}>
            <Image src="/fake_logo.svg" alt="logo" width={76} height={76}/>
            <p className='title'>About Brand</p>
            <Image src="/button_map.svg" alt="logo" width={76} height={76}/>
        </div>
        <div className={styles.description}>
            <p className='pretitle'>Fresh Harvest</p>
            <div className={styles.pricebox}>
                <div className={styles.left_child_box}>
                    <p className='navtext'>Create a post on Instagram with our brand</p>
                    <p className='text'>6$</p>
                </div>
                <div className={`b_button ${styles.right_child_post}`}>
                    Start
                </div>
            </div>
            <div className={styles.social}>
                <p className='pretitle'>Our Socials</p>
                <div className={styles.row_social}>
                <Image src="/instagram.svg" alt='.' width={48} height={48}/>
                <Image src="/facebook.svg" alt='.' width={48} height={48}/>
                <Image src="/twitter.svg" alt='.' width={48} height={48}/>
                </div>
            </div>
        </div>
        <div className={styles.map_part}>
            <p className='pretitle'>Map with locations of Brands</p>
            <Image src="/fake_map.png" width={895} height={506} />
        </div>
        <p className={`text ${styles.text}`}>FreshHarvest is a vibrant and trusted brand that specializes in providing high-quality, farm-fresh vegetables and fruits. We take pride in cultivating our produce using sustainable farming practices, ensuring the highest standards of quality, nutrition, and flavor.
Our brand stands out due to our commitment to locally sourced, seasonal produce. We prioritize supporting local farmers and promoting sustainable agriculture within our community.</p>
    </div>
  )
}

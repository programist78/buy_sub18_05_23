import React from 'react';
import Link from 'next/link';
import styles from './BusinesssView.module.scss'
// import { PostSkeleton } from './Skeleton';
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react';
import { PostSkeleton } from './Skeleton';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import Image from 'next/image';
const BusinessView = ({
  _id,
  brandname,
  image,
  postPrice,
  address
}) => {
  const [hasError, setHasError] = useState(false);

  function handleImageError() {
    setHasError(true);
  }
  const { ref, inView } = useInView({
    treshold: 0.5,
    triggerOnce:true
  })

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    width: "400px",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
        container: 'custom-swal-font',
        title: 'custom-swal-font',
        content: 'custom-swal-font',
        confirmButton: 'custom-swal-font',
      },
  })




  return (
    <div>
      {!inView ?
    ( 
      <Link href={`/brand/${brandname}`}>
      <div className={styles.back}>
        <div className={styles.price}>{postPrice/100}$</div>
        <img src={image} alt={brandname} className={styles.image}/>
        <div className={styles.desc}>
          <Image src="/geomark.svg" width={62} height={62}/>
          <p className='text'>{brandname}</p>
        </div>
      </div>
      </Link>
      )
      : 
      (<PostSkeleton />)
      }
    </div>
  );
};

export default BusinessView
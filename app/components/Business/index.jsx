import Image from "next/image";
import styles from "./Business.module.scss";
import { useQuery } from "@apollo/client";
import { GET_BUSINESS_QUERY } from "../../apollo/posters";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import MapComponent from "../MapComponent";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setSelectBus } from "../../redux/slices/selectBus";
export default function BusinessPageCom({ queryId }) {
  const [data, setData] = useState();
  const dispatch = useDispatch()
  const { data: brandData } = useQuery(GET_BUSINESS_QUERY, {
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    variables: { brandname: queryId },
  });

  useEffect(() => {
    setData(brandData?.getBusinessQuery);
  }, [brandData?.getBusinessQuery]);
  return (
    <div className={styles.back}>
      <div className={styles.header}>
        <img src={data?.avatarUrl} alt="logo" width={76} height={76} />
        <p className="title">{data?.brandname}</p>
        <Image src="/button_map.svg" alt="button_map" width={76} height={76} />
      </div>
      <div className={styles.description}>
        {/* <p className='pretitle'>Fresh Harvest</p> */}
        <div className={styles.pricebox}>
          <div className={styles.left_child_box}>
            <p className="navtext">Create a post on Instagram with our brand</p>
            <p className="text">${data?.postPrice/100}</p>
          </div>
          <Link onClick={() => dispatch(setSelectBus(data?.brandname))} href="/personal/poster"><div className={`b_button ${styles.right_child_post}`}>Start</div></Link>
        </div>

        <div className={styles.social}>
          <p className="pretitle">Our Socials</p>
          <div className={styles.row_social}>

          {data?.socialMedia?.facebook?.name !== "" && data?.socialMedia?.facebook !== null && (
  <a href={`https://www.instagram.com/${data?.socialMedia?.instagram?.name}/`}>
    <Image src="/instagram.svg" alt="." width={48} height={48} />
  </a>
)}

{data?.socialMedia?.facebook?.name !== "" && data?.socialMedia?.facebook !== null && (
  <a href={`https://www.facebook.com/${data?.socialMedia?.facebook?.name}/`}>
    <Image src="/facebook.svg" alt="." width={48} height={48} />
  </a>
)}
{data?.socialMedia?.twitter?.name !== "" && data?.socialMedia?.twitter !== null && (
  <a href={`https://www.tiktok.com/@${data?.socialMedia?.twitter?.name}/`}>
    <Image src="/tiktok.svg" alt="." width={48} height={48} />
  </a>
)}


          </div>
        </div>
      </div>
      <div className={styles.map_part}>
        <p className="pretitle">Map with locations of Businesss</p>
        {/* <Image src="/fake_map.png" width={895} height={506} alt="map"/> */}
        <MapComponent latitude={data?.physicalLocation?.latitude} longitude={data?.physicalLocation?.longitude} />
      </div>
      <p className={`text ${styles.text}`}>{data?.brandDescription}</p>
    </div>
  );
}

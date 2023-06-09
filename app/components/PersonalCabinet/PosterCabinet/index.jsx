import Image from "next/image";
import styles from "./PersonalCabinet.module.scss";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import { AuthContext } from "../../../hooks/AuthContext";
import { CREATE_POSTER_POST, GET_BRAND, GET_NEW_BRANDS, GET_POPULAR_BRANDS } from "../../../apollo/posters";
import { useQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useRouter } from "next/router";
import BrandView from "../../BrandsView";
import WithdrawCom from "../../Stripe/WithdrawCom";
import { clearToken } from "../../../redux/slices/auth";
export default function PosterCabinetCom() {
    const router = useRouter()
    const [filter, setFilter] = useState("1")
    const { userInfo } = useSelector((state) => state.userInfo);
    {!userInfo ? router.push('/') : ""}
  const { user, logout, authredux } = useContext(AuthContext);
  const [brandname, setBrandname] = useState("");
  const [brandId, setBrandId] = useState("");
  const [image, setImage] = useState([]);
  const [selectedSocial, setselectedSocial] = useState("")
  const [selectedReview, setselectedReview] = useState("")
  const [text, setText] = useState(`Selected social network - ${selectedSocial}. Selected review site - ${selectedReview}`)
  console.log(image)
  const [searchText, setSearchText] = useState("");
  const [getBrand] = useMutation(GET_BRAND, {
    onError(error) {
        Swal.fire({
          icon: 'error',
          title: `${error}`
        })
    },
    onCompleted: (data) => {
        setBrandId(data.getBrand)
        Swal.fire({
            icon: 'success',
            title: `Keep creating the post `
          })
    } ,
    variables: {brandname}})

  const [createPost] = useMutation(CREATE_POSTER_POST, {
    onError(error) {
        Swal.fire({
          icon: 'error',
          title: `${error}`
        })
    },
    onCompleted: (data) => {
        setBrandId(data)
        Swal.fire({
            icon: 'success',
            title: `Success! `
          })
    } ,
    variables: {image, post: { text, brandId, authorId: userInfo?.id, selectedReview, selectedSocial }}
  })




  const onLogout = () => {
    logout();
    router.push("/");
    clearToken(), clearUserInfo();
    document.location.reload();
  };

//   function onChangeCP({ target: { validity, files } }) {
//     if (validity.valid && files && files[0]) setImage(files);
//   }
const [dataBrands, setDataBrands] = useState([]);
  function onChangeCP({ target: { validity, files } }) {
    if (validity.valid && files && files[0]) {
      // Создаем новый массив, объединяющий существующие изображения и новый файл
      const newImages = [...image, files[0]];
      setImage(newImages);
    }
  }

  const {data: getNewBrands, loading: getNewLoading, error: getNewError} = useQuery(GET_NEW_BRANDS)
  const {data: getPopularBrands, loading: getPopularLoading, error:getPopularError} = useQuery(GET_POPULAR_BRANDS)
  
  const filteredPopular = getNewBrands?.getNewBrands?.filter(obj => {
    return (
        obj.brandname.toLowerCase().includes(searchText?.toLowerCase()) 
    );
  });

  const filteredNew = getPopularBrands?.getPopularBrands?.filter(obj => {
    return (
        obj.brandname.toLowerCase().includes(searchText?.toLowerCase()) 
    );
  });

  const props = {
    name: 'file',
    // action: {set},
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        setImage(prevImage => [...prevImage, file.originFileObj]); // Добавляем новые файлы к существующему состоянию image
      }
    },
    
  };
  return (
    <div className={styles.back}>
      <p className="title">Let's get posting</p>
      <div className={styles.inline_part}>
        <div className={styles.log_part}>
          <Image src="/fake_logo.svg" width={139} height={139} alt="logo" />
          <div className={styles.child_log_part}>
            <p className="text">{userInfo?.fullname}</p>
            <div className={`text ${styles.addborders}`}>My account</div>
            <p onClick={onLogout} className="text">
              Sign Out
            </p>
          </div>
        </div>
        <div className={styles.select_brand_part}>
          <div className={styles.row_part}>
            <div className={styles.input_part}>
              <p className="nav_text">Selected brand</p>
              <input
                type="text"
                className="a_input"
                value={brandname}
                onChange={(e) => setBrandname(e.target.value)}
              />
            </div>
            {brandname ? (
              <button className="b_button" onClick={() => getBrand()}>Check</button>
            ) : (
              <a><button className="b_button" >Choose a business</button></a>
            )}
          </div>
          <div className={styles.row_part}>
            <p className="nav_text">Payment for the completed tasks</p>
            <button className="a_button">10$</button>
            {/* <WithdrawCom /> */}
          </div>
        </div>
      </div>
      <p className="pretitle">Post</p>
      <div className={styles.social_box}>

        <p className="nav_text">Select a social</p>
        <div className={styles.social_part}>
        {/* {(selectedSocial == "") ?           <Image src="/instagram.svg" alt="instagram" className={styles.select} width={65} height={65} /> :} */}
          <Image src="/instagram.svg" className={(selectedSocial == "instagram" ? styles.select : "" )} onClick={() => setselectedSocial("instagram")} alt="instagram" width={65} height={65} />
          <Image src="/facebook.svg" className={(selectedSocial == "facebook" ? styles.select : "" )} alt="facebook" width={65} height={65} onClick={() => setselectedSocial("facebook")}/>
          <Image src="/tiktok.svg" className={(selectedSocial == "tiktok" ? styles.select : "" )} alt="tik-tok" width={65} height={65} onClick={() => setselectedSocial("tiktok")}/>
        </div>
        <div className={styles.download_part}>
          <Image src="/file_download.svg" width={66} height={66} alt="." />
          <p className="nav_text">Download your Review Screenshot </p>
          {/* <button className="b_button">Download</button> */}
          {/* <input type="file" required multiple onChange={onChangeCP} className="b_button"/> */}
          <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <p className="nav_text">Select a Review Site</p>
        <div className={styles.review_part}>
          <Image className={(selectedReview == "google" ? styles.select : "" )} onClick={() => setselectedReview("google")} src="/google.svg" alt="google" width={40} height={40} />
          <Image className={(selectedReview == "yelp" ? styles.select : "" )} onClick={() => setselectedReview("yelp")} src="/yelp.svg" alt="yelp" width={40} height={40} />
          <Image className={(selectedReview == "tripadvisor" ? styles.select : "" )} onClick={() => setselectedReview("tripadvisor")} src="/tripadvisor.svg" alt="tik-tok" width={40} height={40} />
        </div>
        <div className={styles.download_part}>
          <Image src="/file_download.svg" width={66} height={66} alt="." />
          <p className="nav_text">Download your Social Media Screenshot </p>
          {/* <button className="b_button">Download</button> */}
          {/* <input type="file" required multiple onChange={onChangeCP} className="b_button"/> */}
          <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <button className="b_button" onClick={() => createPost()}>Complete</button>
      </div>
      <p className="title">Businesses</p>
      <div className={styles.box}>
        <div className={styles.filters}>
            <div onClick={() => setFilter("1")} className={`pretitle ${(filter == "1" ? styles.active : "")}`}>Popular</div>
            <div onClick={() => setFilter("2")} className={`pretitle ${(filter == "2" ? styles.active : "")}`}>New</div>
        </div>
        <div className={styles.input_box}>
        <input type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="a_input" placeholder="Brand name" />
        </div>

      </div>
      {(filter == "1") ?
        <div value="1"> 
            <div className={styles.back2}>
            {(getPopularLoading ? [...Array(3)] :filteredPopular)?.map((obj, key) => 
             getPopularLoading ? 
             (<BrandView     key={key} 
                 myKey={key} isLoading={true} />) :
            (
            <BrandView
                _id={obj.id}
                brandname={obj.brandname}
                image={obj.image}
                postPrice={obj.postPrice}
            />
            ),
            )}
        </div>
        </div>
        :
        <div value="1"> 
            <div className={styles.back2}>
            {(getNewLoading ? [...Array(3)] :filteredNew)?.map((obj, key) => 
             getNewLoading ? 
             (<BrandView     key={key} 
                 myKey={key} isLoading={true} />) :
            (
            <BrandView
                _id={obj.id}
                brandname={obj.brandname}
                image={obj.image}
                postPrice={obj.postPrice}
            />
            ),
            )}
        </div>
        </div>
}
      {/* <BusinessPart /> */}
    </div>
  );
}

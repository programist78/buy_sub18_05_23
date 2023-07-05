import Image from "next/image";
import styles from "./PersonalCabinet.module.scss";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../hooks/AuthContext";
import {
  CREATE_POSTER_POST,
  GET_ALL_PENDING_POSTS,
  GET_BUSINESS,
  GET_NEW_BUSINESSS,
  GET_POPULAR_BUSINESSS,
} from "../../../apollo/posters";
import { useQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useRouter } from "next/router";
// import BusinessView from "../../BusinesssView";
import BusinessView from "../../BusinessView";
import WithdrawCom from "../../Stripe/WithdrawCom";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { clearToken } from "../../../redux/slices/auth";
import Modal from "react-modal";
import { clearUserInfo } from "../../../redux/slices/userInfo";
import Link from "next/link";
import { BiPencil } from "react-icons/bi";

import SmallLoader from "../../Loaders/SmallLoader";
import ConnectStripeButton from "../../ConnectStripe";
import { CHANGE_USER, POSTER_COMPLETE_REGISTER } from "../../../apollo/auth";
export default function PosterCabinetCom() {
  const router = useRouter();
  const [images, setImageChange] = useState([]);
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);
  const [filter, setFilter] = useState("1");
  const [edit, setEdit] = useState(false);
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [tiktokUserName, setTiktokUserName] = useState("");
  const [tiktokFollowers, setTiktokFollowers] = useState("");
  const [instagramUserName, setInstagramUserName] = useState("");
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookUserName, setFacebookUserName] = useState("");
  const [facebookFollowers, setFacebookFollowers] = useState("");
  const [yelpReview, setYelpReview] = useState("");
  const [tripadvisorReview, setTripadvisorReview] = useState("");
  const [googleReview, setGoogleReview] = useState("");
  const [businessPrice, setBusinessPrice] = useState("");
  const { userInfo } = useSelector((state) => state.userInfo);
  const { selectBus } = useSelector((state) => state.selectBus);
  {
    !userInfo ? router.push("/") : "";
  }
  const { user, logout, authredux } = useContext(AuthContext);
  const [brandname, setBusinessname] = useState("");
  useEffect(() => {
    setBusinessname(selectBus);
  }, [selectBus]);

  const [brandId, setBusinessId] = useState("");
  const [image, setImage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSocial, setselectedSocial] = useState("");
  const [selectedReview, setselectedReview] = useState("");
  const [text, setText] = useState(
    `Selected social network - ${selectedSocial}. Selected review site - ${selectedReview}`
  );

  useEffect(() => {
    setEditPhone(userInfo?.phone);
  }, [userInfo?.phone]);

  useEffect(() => {
    setEditAddress(userInfo?.address);
  }, [userInfo?.address]);
  const [searchText, setSearchText] = useState("");
  const [getBusiness] = useMutation(GET_BUSINESS, {
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    onCompleted: (data) => {
      setBusinessId(data.getBusiness.id);
      setBusinessPrice(data.getBusiness.postPrice);
      Swal.fire({
        icon: "success",
        title: `Keep creating the post `,
      });
    },
    variables: { brandname },
  });

  const [createPost] = useMutation(CREATE_POSTER_POST, {
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    onCompleted: (data) => {
      router.reload();
      Swal.fire({
        icon: "success",
        title: `Success! `,
      });
    },
    variables: {
      image,
      post: {
        text,
        brandId,
        authorId: userInfo?.id,
        selectedReview,
        selectedSocial,
      },
    },
  });

  console.log(brandId);

  const onLogout = () => {
    logout();
    router.push("/");
    clearToken(), clearUserInfo();
    document.location.reload();
  };

  //   function onChangeCP({ target: { validity, files } }) {
  //     if (validity.valid && files && files[0]) setImage(files);
  //   }
  const [dataBusinesss, setDataBusinesss] = useState([]);
  function onChangeCP({ target: { validity, files } }) {
    if (validity.valid && files && files[0]) {
      // Создаем новый массив, объединяющий существующие изображения и новый файл
      const newImages = [...image, files[0]];
      setImage(newImages);
    }
  }

  const {
    data: getNewBusinesss,
    loading: getNewLoading,
    error: getNewError,
  } = useQuery(GET_NEW_BUSINESSS);
  const {
    data: getPopularBusinesss,
    loading: getPopularLoading,
    error: getPopularError,
  } = useQuery(GET_POPULAR_BUSINESSS);

  const filteredPopular = getNewBusinesss?.getNewBusinesss?.filter((obj) => {
    return obj.brandname.toLowerCase().includes(searchText?.toLowerCase());
  });

  const filteredNew = getPopularBusinesss?.getPopularBusinesss?.filter(
    (obj) => {
      return obj.brandname.toLowerCase().includes(searchText?.toLowerCase());
    }
  );

  const props = {
    name: "file",
    // action: {set},
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setImage((prevImage) => [...prevImage, file.originFileObj]); // Добавляем новые файлы к существующему состоянию image
      }
    },
  };

  const { data: pendingdata, loading: pendingloading } = useQuery(
    GET_ALL_PENDING_POSTS,
    { variables: { getAllPendingPosterPostsId: userInfo?.id } }
  );
  console.log(userInfo);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(selectBus);

  const [changeInfo] = useMutation(CHANGE_USER, {
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    onCompleted: (data) => {
      Swal.fire({
        icon: "success",
        title: `Loading`,
      });
      setEdit(!edit);
    },
    variables: {
      about: { address: editAddress, phone: editPhone },
      changeUserId: userInfo?.id,
    },
  });

  const [changeSocial, setChangeSocial] = useState(false);

  const [changeSocialMedia] = useMutation(POSTER_COMPLETE_REGISTER, {
    update(proxy, { data: { registerUserComplete: userData } }) {
      context.login(userData);
    },
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    onCompleted: async (data) => {
      Swal.fire({
        icon: "success",
        title: `Redirecting...`,
      });
      setChangeSocial(!changeSocial);
      // Dispatch the action to save user info
      await dispatch(setUserInfo(data.registerUserComplete.user));
    },
    // variables: { registerUserCompleteId: posterId, social: {tiktokUserName, tiktokFollowers, instagramUserName, instagramFollowers, facebookUserName, facebookFollowers}},
    variables: {
      registerUserCompleteId: userInfo.id,
      social: {
        tiktokUserName,
        tiktokFollowers,
        instagramUserName,
        instagramFollowers,
        facebookUserName,
        facebookFollowers,
      },
      review: { yelpReview, tripadvisorReview, googleReview },
      images,
    },
  });

  const props2 = {
    name: "file",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setImageChange((prevImage) => [...prevImage, file.originFileObj]); // Добавляем новые файлы к существующему состоянию image
      }
    },
  };

  function SaveAll() {
    changeInfo();
    if (facebookUserName || instagramUserName || tiktokUserName) {
      changeSocialMedia();
    }
  }
  return (
    <div className={styles.back}>
      <p className="title">Let's get posting</p>
      {brandId == "" ? (
        <p className="pretitle"> First select a business to post about</p>
      ) : (
        // <p className="nav_text">Selected brand</p>
        <p className="pretitle">Keep creating the post</p>
      )}
      <div className={styles.inline_part}>
        <div className={styles.select.brand_part}>
          <div className={styles.log_part}>
            <img
              src={userInfo?.avatarUrl}
              width={139}
              height={139}
              alt="logo"
            />
            <div className={styles.child_log_part}>
              <p className="text">{userInfo?.fullname}</p>
              <div className={`text ${styles.addborders}`}>My account</div>
              <p onClick={onLogout} className="text">
                Sign Out
              </p>
            </div>
          </div>
          <br />
          <br />
          <ConnectStripeButton />
        </div>
        <div className={styles.select_brand_part}>
          <div className={styles.row_part}>
            <div className={styles.input_part}>
              <p className="nav_text">Selected brand</p>

              <input
                type="text"
                className="a_input"
                value={brandname}
                onChange={(e) => setBusinessname(e.target.value)}
              />
            </div>
            {brandname ? (
              <button className="b_button" onClick={() => getBusiness()}>
                Check
              </button>
            ) : (
              <a>
                <button className="b_button">Choose a business</button>
              </a>
            )}
          </div>
          <div className={styles.row_part}>
            <p className="nav_text">Payment for the completed tasks</p>
            <button className="a_button">
              {!businessPrice
                ? `No business chosen`
                : `$${businessPrice / 100 /100 * 70}`}
            </button>
            {/* <WithdrawCom /> */}
          </div>
          <p className="nav_text">
            You get 70% of this sum after successfully completing the post for
            your chosen business
          </p>
          <div className={styles.row_part}>
            <div
              className={`a_input ${styles.statistic_div}`}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 5%",
              }}
            >
              <p className="text">Posts awaiting approval</p>
              <p className="text">
                {pendingdata ? (
                  pendingdata?.getAllPendingPosterPosts?.length
                ) : (
                  <SmallLoader />
                )}
              </p>
            </div>
            <button onClick={openModal} className="b_button">
              View
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Кастомный попап"
          >
            <div className={styles.modal}>
              <AiOutlineCloseCircle onClick={closeModal} />

              {pendingdata?.getAllPendingPosterPosts?.map((obj, key) =>
                pendingloading ? (
                  <div
                    className={`a_input ${styles.statistic_div} ${styles.modal_div}`}
                  >
                    <p className="text">Loading...</p>
                  </div>
                ) : (
                  <div className={styles.row_part}>
                    <div
                      className={`a_input ${styles.statistic_div} ${styles.modal_div}`}
                    >
                      <p className="text">
                        Selected social - {obj.selectedSocial}
                      </p>
                      <p className="text">
                        Selected review - {obj.selectedReview}
                      </p>
                      {obj.images.map((image) => (
                        <img src={image} className={styles.modal_image} />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </Modal>
        </div>
      </div>
      {
        selectedSocial == "" && brandId ? (
          <p className="pretitle">
            {" "}
            Next Select which of your social sites you posted on
          </p>
        ) : (
          ""
        )
        // <p className="nav_text">Selected brand</p>
        //
      }
      {selectedSocial ? <p className="pretitle">Keep creating the post</p> : ""}
      {userInfo?.socialMedia?.instagram ||
      userInfo?.socialMedia?.facebook ||
      userInfo?.socialMedia?.tiktok ? (
        <div className={styles.social_box}>
          <p className="nav_text">Select a social</p>
          <div className={styles.social_part}>
            {/* {(selectedSocial == "") ?           <Image src="/instagram.svg" alt="instagram" className={styles.select} width={65} height={65} /> :} */}
            <Image
              src="/instagram.svg"
              className={selectedSocial == "instagram" ? styles.select : ""}
              onClick={() => setselectedSocial("instagram")}
              alt="instagram"
              width={65}
              height={65}
            />
            <Image
              src="/facebook.svg"
              className={selectedSocial == "facebook" ? styles.select : ""}
              alt="facebook"
              width={65}
              height={65}
              onClick={() => setselectedSocial("facebook")}
            />
            <Image
              src="/tiktok.svg"
              className={selectedSocial == "tiktok" ? styles.select : ""}
              alt="tik-tok"
              width={65}
              height={65}
              style={{ borderRadius: "50%" }}
              onClick={() => setselectedSocial("tiktok")}
            />
          </div>

          {
            image == "" && selectedSocial ? (
              <p className="pretitle">
                {" "}
                Now after you take a screenshot of your post please upload it
                here.
              </p>
            ) : (
              ""
            )
            // <p className="nav_text">Selected brand</p>
            //
          }
          {image.length >= 1 ? (
            <p className="pretitle">Keep creating the post</p>
          ) : (
            ""
          )}
          <div className={styles.download_part}>
            <Image src="/file_download.svg" width={66} height={66} alt="." />
            <p className="nav_text">Download your Social Media Screenshot </p>

            {/* <button className="b_button">Download</button> */}
            {/* <input type="file" required multiple onChange={onChangeCP} className="b_button"/> */}
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          {
            selectedReview == "" && image.length >= 1 ? (
              <p className="pretitle">Now please select a review site</p>
            ) : (
              ""
            )
            // <p className="nav_text">Selected brand</p>
            //
          }
          {selectedReview ? (
            <p className="pretitle">Keep creating the post</p>
          ) : (
            ""
          )}

          <p className="nav_text">Select a Review Site</p>
          <div className={styles.review_part}>
            <Image
              className={selectedReview == "google" ? styles.select : ""}
              onClick={() => setselectedReview("google")}
              src="/google.svg"
              alt="google"
              width={40}
              height={40}
            />
            <Image
              className={selectedReview == "yelp" ? styles.select : ""}
              onClick={() => setselectedReview("yelp")}
              src="/yelp.svg"
              alt="yelp"
              width={40}
              height={40}
            />
            <Image
              className={selectedReview == "tripadvisor" ? styles.select : ""}
              onClick={() => setselectedReview("tripadvisor")}
              src="/tripadvisor.svg"
              alt="tik-tok"
              width={40}
              height={40}
            />
          </div>
          {
            image?.length == 1 && selectedReview ? (
              <p className="pretitle">
                Then after you take a screenshot of your review please upload it
                here.
              </p>
            ) : (
              ""
            )
            // <p className="nav_text">Selected brand</p>
            //
          }
          {image?.length >= 2 ? (
            <p className="pretitle">
              Now press the complete button once all the above has been done.
            </p>
          ) : (
            ""
          )}

          <div className={styles.download_part}>
            <Image src="/file_download.svg" width={66} height={66} alt="." />
            <p className="nav_text">Download your Review Screenshot </p>
            {/* <button className="b_button">Download</button> */}
            {/* <input type="file" required multiple onChange={onChangeCP} className="b_button"/> */}
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <button className="b_button" onClick={() => createPost()}>
            Complete
          </button>
        </div>
      ) : (
        <div className={styles.social_box}>
          <p className="pretitle">
            Please add social media and review websites to create posts
          </p>
          <Link href="/auth/add-info">
            <button className="b_button">Click to add</button>
          </Link>
        </div>
      )}

      {isAccountingOpen ? (
        <div className={styles.info_part}>
          {edit ? (
            <>
              <button onClick={() => changeInfo()} className="b_button">
                Save information
              </button>
              <button
                onClick={() => setIsAccountingOpen(!isAccountingOpen)}
                className="b_button"
              >
                Close
                <span>
                  <AiOutlineCloseCircle />
                </span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEdit(!edit)} className="b_button">
                Edit -
                <span>
                  <BiPencil />
                </span>
              </button>
              <button
                onClick={() => setIsAccountingOpen(!isAccountingOpen)}
                className="b_button"
              >
                Close
                <span>
                  <AiOutlineCloseCircle />
                </span>
              </button>
            </>
          )}
          {edit ? (
            <>
              <p className="text">Your contact phone :</p>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                // className={`${styles.changeinfo_input} text`}
                className="a_input"
              />
              <p className="text">Address : {userInfo?.address}</p>
              <input
                type="text"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                className="a_input"
              />
              {changeSocial ? (
                <>
                  <form
                    onSubmit={() => changeSocialMedia()}
                    className={styles.form}
                  >
                    <div className={styles.social_input}>
                      <Image
                        src="/facebook.svg"
                        width={40}
                        height={40}
                        alt="facebook"
                      />
                      <input
                        className={`a_input ${styles.nick_input}`}
                        type="text"
                        onChange={(e) => setFacebookUserName(e.target.value)}
                        placeholder="Your Facebook Username"
                      />
                      <input
                        type="number"
                        className={`a_input ${styles.number_input}`}
                        onChange={(e) => setFacebookFollowers(e.target.value)}
                        placeholder="Number of your friends"
                      />
                      <Image
                        src="/file_download.svg"
                        width={40}
                        height={40}
                        alt="file"
                      />
                      <p className="nav_text">Screenshot of your social</p>
                      {/* <input
                className={`b_button ${styles.custom_input}`}
                type="file"
              /> */}
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    </div>
                    <div className={styles.social_input}>
                      <Image
                        src="/instagram.svg"
                        width={40}
                        height={40}
                        alt="instagram"
                      />
                      <input
                        type="text"
                        className={`a_input ${styles.nick_input}`}
                        onChange={(e) => setInstagramUserName(e.target.value)}
                        placeholder="Your Instagram Username"
                      />
                      <input
                        type="number"
                        className={`a_input ${styles.number_input}`}
                        onChange={(e) => setInstagramFollowers(e.target.value)}
                        placeholder="Number of your followers"
                      />
                      <Image
                        src="/file_download.svg"
                        width={40}
                        height={40}
                        alt="file"
                      />
                      <p className="nav_text">Screenshot of your social</p>
                      {/* <input
                className={`b_button ${styles.custom_input}`}
                type="file"
              /> */}
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    </div>
                    <div className={styles.social_input}>
                      <Image
                        src="/tiktok.svg"
                        style={{ borderRadius: "50%" }}
                        width={40}
                        height={40}
                        alt="tiktok"
                      />
                      <input
                        type="text"
                        onChange={(e) => setTiktokUserName(e.target.value)}
                        className={`a_input ${styles.nick_input}`}
                        placeholder="Your TikTok Username"
                      />
                      <input
                        type="number"
                        className={`a_input ${styles.number_input}`}
                        onChange={(e) => setTiktokFollowers(e.target.value)}
                        placeholder="Number of your followers"
                      />
                      <Image
                        src="/file_download.svg"
                        width={40}
                        height={40}
                        alt="file"
                      />
                      <p className="nav_text">Screenshot of your social</p>
                      {/* <input
                className={`b_button ${styles.custom_input}`}
                type="file"
              /> */}
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    </div>
                    <div className="a_instrusctions">
                      <p>
                        • Please select which review sites you are signed for
                        and enter your review sites username.
                        <br />• If you have a Gmail account you can
                        automatically leave a google review. Please enter your
                        google account name.
                      </p>
                    </div>
                    <div className={styles.social_input}>
                      <Image
                        src="/google.svg"
                        width={40}
                        height={40}
                        alt="google"
                      />
                      <input
                        type="text"
                        className="a_input"
                        onChange={(e) => setGoogleReview(e.target.value)}
                        placeholder="Your Google"
                      />
                      <a
                        href="https://accounts.google.com/signup."
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <p className="nav_text">Don't have an account?</p>
                        <button className={`b_button`}>Sign up</button>
                      </a>
                    </div>
                    <div className={styles.social_input}>
                      <Image
                        src="/yelp.svg"
                        width={40}
                        height={40}
                        alt="yelp"
                      />
                      <input
                        type="text"
                        className="a_input"
                        onChange={(e) => setYelpReview(e.target.value)}
                        placeholder="Your Yelp"
                      />
                      <a
                        href="https://www.yelp.com/signup?return_url=https%3A%2F%2Fwww.yelp.com%2F"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <p className="nav_text">Don't have an account?</p>
                        <button className={`b_button`}>Sign up</button>
                      </a>
                    </div>
                    <div className={styles.social_input}>
                      <Image
                        src="/tripadvisor.svg"
                        width={40}
                        height={40}
                        alt="tripadvisor"
                      />
                      <input
                        type="text"
                        className="a_input"
                        onChange={(e) => setTripadvisorReview(e.target.value)}
                        placeholder="Your Tripadvisor"
                      />
                      <a
                        href="https://www.tripadvisor.com"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <p className="nav_text">Don't have an account?</p>
                        <button className={`b_button`}>Sign up</button>
                      </a>
                    </div>
                    {/* <button
              type="submit"
              // disabled={messageError == "" ? false : true}
              className={`b_button ${styles.b_button}`}
            >
              Save Information
            </button> */}
                  </form>
                </>
              ) : (
                <button
                  onClick={() => setChangeSocial(!changeSocial)}
                  className="b_button"
                >
                  Change Social Media and Review
                </button>
              )}{" "}
              {/* <p className="text">Your social media : </p> */}
            </>
          ) : (
            <>
              <p className="text">Your contact phone : {userInfo?.phone}</p>
              <p className="text">Your address : {userInfo?.address}</p>
              <p className="text">
                Your Social Media :
                <br />
                {userInfo?.socialMedia?.instagram?.name
                  ? `Instagram nick: ${userInfo?.socialMedia?.instagram?.name}, followers: ${userInfo?.socialMedia?.instagram?.followers}`
                  : ""}
                <br />
                {userInfo?.socialMedia?.tiktok?.name
                  ? `Tiktok nick: ${userInfo?.socialMedia?.tiktok?.name}, followers: ${userInfo?.socialMedia?.tiktok?.followers}`
                  : ""}
                <br />
                {userInfo?.socialMedia?.facebook?.name
                  ? `Facebook nick: ${userInfo?.socialMedia?.facebook?.name}, followers: ${userInfo?.socialMedia?.facebook?.followers}`
                  : ""}
              </p>
              <p className="text">
                Your review website :
                <br />
                {userInfo?.reviewMedia?.tripadvisor
                  ? `Tripadvisor: ${userInfo?.reviewMedia?.tripadvisor}`
                  : ""}
                <br />
                {userInfo?.reviewMedia?.yelp
                  ? `Yelp: ${userInfo?.reviewMedia?.yelp}`
                  : ""}
                <br />
                {userInfo?.reviewMedia?.google
                  ? `Google: ${userInfo?.reviewMedia?.google}`
                  : ""}
                <br />
              </p>
              {/* <p className="text">
                    Instagram : {userInfo?.socialMedia?.instagram}
                  </p>
                  <p className="text">
                    Facebook : {userInfo?.socialMedia?.facebook}
                  </p>
                  <p className="text">
                    Twitter : {userInfo?.socialMedia?.twitter}
                  </p> */}
              {/* <p className="text">Your social media : </p> */}
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsAccountingOpen(!isAccountingOpen)}
          className="b_button"
        >
          Accounting information
        </button>
      )}
      <p className="title">Businesses</p>
      <div className={styles.box}>
        <div className={styles.filters}>
          <div
            onClick={() => setFilter("1")}
            className={`pretitle ${filter == "1" ? styles.active : ""}`}
          >
            Popular
          </div>
          <div
            onClick={() => setFilter("2")}
            className={`pretitle ${filter == "2" ? styles.active : ""}`}
          >
            New
          </div>
        </div>
        <div className={styles.input_box}>
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="a_input"
            placeholder="Business name"
          />
        </div>
      </div>
      {filter == "1" ? (
        <div value="1">
          <div className={styles.back2}>
            {(getPopularLoading ? [...Array(3)] : filteredPopular)?.map(
              (obj, key) =>
                getPopularLoading ? (
                  <BusinessView key={key} myKey={key} isLoading={true} />
                ) : (
                  <BusinessView
                    _id={obj.id}
                    brandname={obj.brandname}
                    image={obj.image}
                    postPrice={obj.postPrice}
                  />
                )
            )}
          </div>
        </div>
      ) : (
        <div value="1">
          <div className={styles.back2}>
            {(getNewLoading ? [...Array(3)] : filteredNew)?.map((obj, key) =>
              getNewLoading ? (
                <BusinessView key={key} myKey={key} isLoading={true} />
              ) : (
                <BusinessView
                  _id={obj.id}
                  brandname={obj.brandname}
                  image={obj.image}
                  postPrice={obj.postPrice}
                />
              )
            )}
          </div>
        </div>
      )}
      {/* <BusinessPart /> */}
    </div>
  );
}

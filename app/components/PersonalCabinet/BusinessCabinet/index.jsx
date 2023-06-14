import Image from "next/image";
import styles from "./BusinessCabinet.module.scss";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import {
  ACCEPT_POSTER_POST,
  COMPLETED_POSTS_FOR_BUSINESS,
  DECLINE_POSTER_POST,
  PENDING_POSTS_FOR_BUSINESS,
} from "../../../apollo/brands";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import SmallLoader from "../../Loaders/SmallLoader";
import { BiPencil } from "react-icons/bi";
import { CHANGE_USER } from "../../../apollo/auth";
export default function BusinessCabinetCom() {
  //edit Information
  const [edit, setEdit] = useState(false);
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPostPrice, setEditPostPrice] = useState("");
  const [editWebsiteLink, setEditWebsiteLink] = useState("");
  const [editBrandDescription, setEditBrandDescription] = useState("");
  //user Info
  const { userInfo } = useSelector((state) => state.userInfo);
  //open modules
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    setEditPhone(userInfo?.phone);
  }, [userInfo?.phone]);

  useEffect(() => {
    setEditPostPrice(userInfo?.postPrice);
  }, [userInfo?.postPrice]);

  useEffect(() => {
    setEditAddress(userInfo?.address);
  }, [userInfo?.address]);

  useEffect(() => {
    setEditWebsiteLink(userInfo?.websiteLink);
  }, [userInfo?.websiteLink]);

  useEffect(() => {
    setEditBrandDescription(userInfo?.editBrandDescription);
  }, [userInfo?.editBrandDescription]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal2 = () => {
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };
  const { data: pendingdata, loading: pendingloading } = useQuery(
    PENDING_POSTS_FOR_BUSINESS,
    { variables: { getAllPendingPosterPostsforBusinessId: userInfo?.id } }
  );
  const { data: completeddata, loading: completedLoading } = useQuery(
    COMPLETED_POSTS_FOR_BUSINESS,
    {
      variables: { getAllCompletedPosterPostsforBusinessId: userInfo?.id },
    }
  );
  const [declinePost] = useMutation(DECLINE_POSTER_POST, {
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
    },
  });
  const [acceptPost] = useMutation(ACCEPT_POSTER_POST, {
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
    },
  });
  function onClickDecline(posterPostId) {
    declinePost({ variables: { posterPostId } });
  }

  function onClickAccept(posterPostId) {
    acceptPost({ variables: { posterPostId } });
  }


  function Save() {
    changeInfo();
  }

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
      // about: {websiteLink: editWebsiteLink, postPrice: editPostPrice, phone: editPhone, brandDescription: editBrandDescription, address: editAddress},
     changeUserId: userInfo?.id},
  })
  return (
    <div className={styles.back}>
      <p className="title">My account Page</p>
      {userInfo ? (
        <>
          <div className={styles.part1}>
            <div className={styles.logo_part}>
              <p className={`text ${styles.text}`}>{userInfo?.brandname}</p>
              <img
                src={userInfo?.avatarUrl}
                alt="logo"
                width={139}
                height={139}
              />
              <p className={`navtext ${styles.navtext}`}>
                Edit Business Details
              </p>
            </div>
            <div className={styles.info_part}>
              <p className="pretitle">Posts Status</p>
              <div className={styles.row_part}>
                <div className={`a_input ${styles.statistic_div}`}>
                  <p className="text">Posts awaiting approval</p>
                  <p className="text">
                    {pendingdata ? (
                      pendingdata?.getAllPendingPosterPostsforBusiness?.length
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

                  {pendingdata?.getAllPendingPosterPostsforBusiness?.map(
                    (obj, key) =>
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
                          <div className={styles.modal_div}>
                            <button
                              onClick={() => onClickAccept(obj.id)}
                              className="b_button"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => onClickDecline(obj.id)}
                              className="b_button"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </Modal>
              <Modal
                isOpen={isOpen2}
                onRequestClose={closeModal2}
                contentLabel="Кастомный попап"
              >
                <div className={styles.modal}>
                  <AiOutlineCloseCircle onClick={closeModal2} />

                  {completeddata?.getAllCompletedPosterPostsforBusiness.map(
                    (obj, key) =>
                      completedLoading ? (
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
              <div className={styles.row_part}>
                <div className={`a_input ${styles.statistic_div}`}>
                  {/* <p className='text'>Posts approved this past month</p> */}
                  <p className="text">Posts approved</p>
                  <p className="text">
                    {pendingdata ? (
                      completeddata?.getAllCompletedPosterPostsforBusiness
                        ?.length
                    ) : (
                      <SmallLoader />
                    )}
                  </p>
                </div>
                <button onClick={openModal2} className="b_button">
                  View
                </button>
              </div>
            </div>
          </div>
          <div className={styles.payment_part}>
            <div className={styles.pay_box}>
              <p className={`navtext ${styles.navtext}`}>
                If you use paypal and or others, you must first register in
                these payment systems and then proceed to payment.
              </p>
              <input type="text" className="a_input" />
              <div className={styles.inputs}>
                <input type="text" className={`a_input ${styles.customone}`} />
                <input type="text" className={`a_input ${styles.customone}`} />
              </div>
            </div>
            <button className="b_button">Change payment information</button>
          </div>
          <p className="pretitle">Statistic of your monthly expenses</p>
          <div className={styles.statistic_box}>
            <p className="text">Your number of monthly posts</p>
            <p className="text">
              Your brand activity is 76% higher than last month!
            </p>
          </div>
          {isAccountingOpen ? (
            <div className={styles.info_part}>
              {edit ? (
                <button onClick={() => Save()} className="b_button">
                  Save information
                </button>
              ) : (
                <button onClick={() => setEdit(!edit)} className="b_button">
                  Edit -
                  <span>
                    <BiPencil />
                  </span>
                </button>
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
                      <p className="text">
                    Business post price : {userInfo?.postPrice / 100}$
                  </p>
                  <input
                    type="text"
                    value={editPostPrice/100}
                    onChange={(e) => setEditPostPrice(e.target.value)}
                    className="a_input"
                  />
                  <p className="text">
                    Business physical location : {userInfo?.address}
                  </p>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="a_input"
                  />
                  <h1>Here image</h1>
                  <img src={userInfo?.image} className={styles.brandimage} />
                  <p className="text">
                    Business website link : {userInfo?.websiteLink}
                  </p>
                  <input
                    type="text"
                    value={editWebsiteLink}
                    onChange={(e) => setEditWebsiteLink(e.target.value)}
                    className="a_input"
                  />
                                <p className="text">
                    Business brand description : {userInfo?.brandDescription}
                  </p>
                  <input
                    type="text"
                    value={editBrandDescription}
                    onChange={(e) => setEditBrandDescription(e.target.value)}
                    className="a_input"
                  />
      
    
                  {/* <p className="text">Your social media : </p> */}
                </>
              ) : (
                <>
                  <p className="text">Your contact phone : {userInfo?.phone}</p>
                  <p className="text">
                    Business post price : {userInfo?.postPrice / 100}$
                  </p>
                  <p className="text">
                    Business physical location : {userInfo?.address}
                  </p>
                  <img src={userInfo?.image} className={styles.brandimage} />
                  <p className="text">
                    Business website link : {userInfo?.websiteLink}
                  </p>
                  <p className="text">
                    Business brand description : {userInfo?.brandDescription}
                  </p>
                  {/* <p className="text">Your social media : </p> */}
                </>
              )}

              <button
                onClick={() => setIsAccountingOpen(!isAccountingOpen)}
                className="b_button"
              >
                Close
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAccountingOpen(!isAccountingOpen)}
              className="b_button"
            >
              Accounting information
            </button>
          )}
        </>
      ) : (
        <SmallLoader />
      )}
    </div>
  );
}

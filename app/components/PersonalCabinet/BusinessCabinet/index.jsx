import Image from "next/image";
import styles from "./BusinessCabinet.module.scss";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import {
    ACCEPT_POSTER_POST,
  COMPLETED_POSTS_FOR_BRAND,
  DECLINE_POSTER_POST,
  PENDING_POSTS_FOR_BRAND,
} from "../../../apollo/brands";
import Swal from "sweetalert2";
import { useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
export default function BusinessCabinetCom() {
  const { userInfo } = useSelector((state) => state.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

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
    PENDING_POSTS_FOR_BRAND,
    { variables: { getAllPendingPosterPostsforBrandId: userInfo?.id } }
  );
  const { data: completeddata, loading: completedLoading } = useQuery(COMPLETED_POSTS_FOR_BRAND, {
    variables: { getAllCompletedPosterPostsforBrandId: userInfo?.id },
  });
  console.log(completeddata?.getAllCompletedPosterPostsforBrand)
  const [declinePost] = useMutation(DECLINE_POSTER_POST,
    {
        onError(error) {
            Swal.fire({
              icon: 'error',
              title: `${error}`
            })
        },
        onCompleted: (data) => {
          Swal.fire({
              icon: 'success',
              title: `Loading`
            })
        } ,
    });
  const [acceptPost] = useMutation(ACCEPT_POSTER_POST, {
    onError(error) {
        Swal.fire({
          icon: 'error',
          title: `${error}`
        })
    },
    onCompleted: (data) => {
      Swal.fire({
          icon: 'success',
          title: `Loading`
        })
    } ,
  });
  function onClickDecline(posterPostId) {
    console.log(posterPostId)
    declinePost({variables: posterPostId})
  }

  function onClickAccept(posterPostId) {
    acceptPost({variables: {posterPostId}})
  }
  return (
    <div className={styles.back}>
      <p className="title">My account Page</p>
      <div className={styles.part1}>
        <div className={styles.logo_part}>
          <p className={`text ${styles.text}`}>{userInfo?.brandname}</p>
          <img src={userInfo?.avatarUrl} alt="logo" width={139} height={139} />
          <p className={`navtext ${styles.navtext}`}>Edit Business Details</p>
        </div>
        <div className={styles.info_part}>
          <p className="pretitle">Posts Status</p>
          <div className={styles.row_part}>
            <div className={`a_input ${styles.statistic_div}`}>
              <p className="text">Posts awaiting approval</p>
              <p className="text">
                {pendingdata?.getAllPendingPosterPostsforBrand?.length}
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

              {pendingdata?.getAllPendingPosterPostsforBrand?.map((obj, key) =>
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
                      <button onClick={() => onClickAccept(obj.id)} className="b_button">
                        Accept
                      </button>
                      <button onClick={() => onClickDecline(obj.id)} className="b_button">
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

              {completeddata?.getAllCompletedPosterPostsforBrand.map((obj, key) =>
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
                {completeddata?.getAllCompletedPosterPostsforBrand?.length}
              </p>
            </div>
            <button onClick={openModal2} className="b_button">View</button>
          </div>
        </div>
      </div>
      <div className={styles.payment_part}>
        <div className={styles.pay_box}>
          <p className={`navtext ${styles.navtext}`}>
            If you use paypal and or others, you must first register in these
            payment systems and then proceed to payment.
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
      <button className="b_button">Accounting information</button>
    </div>
  );
}

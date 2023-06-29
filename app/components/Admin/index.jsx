import { useEffect, useState } from "react";
import {
  BAN_USER,
  GET_ACCEPTED_BUSINESS_INFO_POSTS,
  GET_ACCEPTED_POSTER_INFO_POSTS,
  GET_BUSINESS_INFO_POSTS,
  GET_BUSINESS_REGISTER,
  GET_BUSINESS_REGISTER_ADDINFO,
  GET_BUSINESS_REGISTER_NEED_ADDINFO,
  GET_BUSINESS_WHOLE_INFO,
  GET_POSTER_INFO_POSTS,
  GET_POSTER_REGISTER,
  GET_POSTER_REGISTER_DETAILS,
  GET_POSTER_REGISTER_SIGNUP,
  GET_POSTER_WHOLE_INFO,
  GET_UNACCEPTED_BUSINESS_INFO_POSTS,
  GET_UNACCEPTED_POSTER_INFO_POSTS,
  UN_BAN_USER,
} from "../../apollo/admin";
import styles from "./Admin.module.scss";
import { useQuery } from "@apollo/client";
import {
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { AiFillEye } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
export default function AdminCom() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Очистка слушателя события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (screenWidth <= 1024) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
        className="title"
      >
        Please use computer to access admin panel
      </div>
    );
  }
  return (
    <div className={styles.back}>
      <BanComponent />
      <UnBanComponent />
      <BusinessRegistration />
      <PosterRegistration />
      <BusinessAdminPanel />
      <PosterAdminPanel />
      <BusinessWholeAdminPanel />
      <PosterWholeAdminPanel />
    </div>
  );
}
//done
function BusinessRegistration() {
  const [page1, setPage1] = useState(1);
  const [leftFilter1, setLeftFilter1] = useState("All Businesses");
  const [argument1, setArgument1] = useState("createdAt");
  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useQuery(GET_BUSINESS_REGISTER, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const {
    data: data1_signedup,
    loading: loading1_signedup,
    error: error1_signedup,
  } = useQuery(GET_BUSINESS_REGISTER_ADDINFO, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const {
    data: data1_addinfo,
    loading: loading1_addinfo,
    error: error1_addinfo,
  } = useQuery(GET_BUSINESS_REGISTER_NEED_ADDINFO, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month}/${day} ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }${hours >= 12 ? "pm" : "am"}`;
    return formattedDate;
  };

  const filterData = () => {
    if (leftFilter1 === "All Businesses") {
      return data1?.getBusinessRegister;
    } else if (leftFilter1 === "Signed Up") {
      return data1_signedup?.getBusinessRegisterwAddInfo;
    } else if (leftFilter1 === "Needs Additional Info") {
      return data1_addinfo?.getBusinessRegisterNeedAddInfo;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.part}>
      <p className="title">Businesses Registration</p>
      <div className={styles.filters}>
        <div
          onClick={() => setLeftFilter1("All Businesses")}
          className={`text ${
            leftFilter1 == "All Businesses" ? styles.this : ""
          }`}
        >
          All Businesses
        </div>
        <div
          onClick={() => setLeftFilter1("Signed Up")}
          className={`text ${leftFilter1 == "Signed Up" ? styles.this : ""}`}
        >
          Signed Up
        </div>
        <div
          onClick={() => setLeftFilter1("Needs Additional Info")}
          className={`text ${
            leftFilter1 == "Needs Additional Info" ? styles.this : ""
          }`}
        >
          Needs Additional Info
        </div>
        <div className={styles.sortby}>
          <div className={`text ${styles.button}`} onClick={toggleMenu}>
            <p>Sort by columns</p>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isOpen && (
            <div className={styles.menu}>
              <div onClick={() => setArgument1("createdAt")} className="text">
                Date
              </div>
              <div onClick={() => setArgument1("address")} className="text">
                Location
              </div>
              <div onClick={() => setArgument1("brandname")} className="text">
                Organization
              </div>
              <div
                onClick={() => setArgument1("brandDescription")}
                className="text"
              >
                Action
              </div>
            </div>
          )}
        </div>
      </div>
      {loading1 ? (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date</th>
              <th className="text">Organisation</th>
              <th className="text">Location</th>
              <th className="text">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date</th>
              <th className="text">Organisation</th>
              <th className="text">Location</th>
              <th className="text">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData()?.map((data, index) => (
              <tr key={index}>
                <td className="text">{formatTimestamp(data.createdAt)}</td>
                <td className="text">{data.brandname}</td>
                <td className="text">{data.address}</td>
                {data.brandDescription ? (
                  <td className="text">
                    <div className={styles.green}>Successfully Signed Up</div>
                  </td>
                ) : (
                  <td className="text">
                    <div className={styles.yellow}>Needs Additional Info</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.foot}>
        <IoIosArrowBack
          className={styles.arrow}
          onClick={() => {
            if (page1 > 1) {
              setPage1(page1 - 1);
            }
          }}
        />
        <input
          type="text"
          className="text"
          value={page1}
          onChange={(e) => setPage1(e.target.value)}
        />
        {/* <p className="text">Next page</p> */}
        <IoIosArrowForward
          className={styles.arrow}
          onClick={() => setPage1(page1 + 1)}
        />
      </div>
    </div>
  );
}
//done
function PosterRegistration() {
  const [page1, setPage1] = useState(1);
  const [leftFilter1, setLeftFilter1] = useState("All Posters");
  const [argument1, setArgument1] = useState("createdAt");
  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useQuery(GET_POSTER_REGISTER, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const {
    data: data1_signedup,
    loading: loading1_signedup,
    error: error1_signedup,
  } = useQuery(GET_POSTER_REGISTER_SIGNUP, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const {
    data: data1_addinfo,
    loading: loading1_addinfo,
    error: error1_addinfo,
  } = useQuery(GET_POSTER_REGISTER_DETAILS, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month}/${day} ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }${hours >= 12 ? "pm" : "am"}`;
    return formattedDate;
  };

  const filterData = () => {
    if (leftFilter1 === "All Posters") {
      return data1?.getPosterRegister;
    } else if (leftFilter1 === "Completed Sign Up Page") {
      return data1_signedup?.getPosterRegisterwSignup;
    } else if (leftFilter1 === "Completed Details Page") {
      return data1_addinfo?.getPosterRegisterwDetails;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.part}>
      <p className="title">Posters Registration</p>
      <div className={styles.filters}>
        <div
          onClick={() => setLeftFilter1("All Posters")}
          className={`text ${leftFilter1 == "All Posters" ? styles.this : ""}`}
        >
          All Posters
        </div>
        <div
          onClick={() => setLeftFilter1("Completed Sign Up Page")}
          className={`text ${
            leftFilter1 == "Completed Sign Up Page" ? styles.this : ""
          }`}
        >
          Completed Sign Up Page
        </div>
        <div
          onClick={() => setLeftFilter1("Completed Details Page")}
          className={`text ${
            leftFilter1 == "Completed Details Page" ? styles.this : ""
          }`}
        >
          Completed Details Page
        </div>
        <div className={styles.sortby}>
          <div className={`text ${styles.button}`} onClick={toggleMenu}>
            <p>Sort by columns</p>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isOpen && (
            <div className={styles.menu}>
              <div onClick={() => setArgument1("createdAt")} className="text">
                Date
              </div>
              <div onClick={() => setArgument1("fullname")} className="text">
                Username
              </div>
              <div onClick={() => setArgument1("brandname")} className="text">
                Login
              </div>
              <div
                onClick={() => setArgument1("brandDescription")}
                className="text"
              >
                Action
              </div>
            </div>
          )}
        </div>
      </div>
      {loading1 ? (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date</th>
              <th className="text">Username</th>
              <th className="text">Login</th>
              <th className="text">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date</th>
              <th className="text">Username</th>
              <th className="text">Login</th>
              <th className="text">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData()?.map((data, index) => (
              <tr key={index}>
                <td className="text">{formatTimestamp(data.createdAt)}</td>
                <td className="text">{data.fullname}</td>
                <td className="text">
                  {data.reviewMedia?.google ||
                  data.reviewMedia?.yelp ||
                  data.reviewMedia?.tripadvisor ? (
                    <div>
                      {data.reviewMedia?.google && <span>Google </span>}
                      {data.reviewMedia?.yelp && <span>Yelp </span>}
                      {data.reviewMedia?.tripadvisor && (
                        <span>TripAdvisor</span>
                      )}
                    </div>
                  ) : (
                    <div>No reviews</div>
                  )}
                </td>
                {data.reviewMedia ? (
                  <td className="text">
                    <div className={styles.green}>Completed Details Page</div>
                  </td>
                ) : (
                  <td className="text">
                    <div className={styles.yellow}>Completed Sign Up Page</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.foot}>
        <IoIosArrowBack
          className={styles.arrow}
          onClick={() => {
            if (page1 > 1) {
              setPage1(page1 - 1);
            }
          }}
        />
        <input
          type="text"
          className="text"
          value={page1}
          onChange={(e) => setPage1(e.target.value)}
        />
        {/* <p className="text">Next page</p> */}
        <IoIosArrowForward
          className={styles.arrow}
          onClick={() => setPage1(page1 + 1)}
        />
      </div>
    </div>
  );
}
//problem with complete info
function BusinessAdminPanel() {
  const [page1, setPage1] = useState(1);
  const [leftFilter1, setLeftFilter1] = useState("All Businesses");
  const [argument1, setArgument1] = useState("createdAt");
  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useQuery(GET_BUSINESS_INFO_POSTS, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const {
    data: data1_signedup,
    loading: loading1_signedup,
    error: error1_signedup,
  } = useQuery(GET_ACCEPTED_BUSINESS_INFO_POSTS, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const {
    data: data1_addinfo,
    loading: loading1_addinfo,
    error: error1_addinfo,
  } = useQuery(GET_UNACCEPTED_BUSINESS_INFO_POSTS, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month}/${day} ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }${hours >= 12 ? "pm" : "am"}`;
    return formattedDate;
  };

  const filterData = () => {
    if (leftFilter1 === "All Businesses") {
      return data1?.getBusinessInfoWPosts;
    } else if (leftFilter1 === "Paid Posts") {
      return data1_signedup?.getAcceptedBusinessInfoWPosts;
    } else if (leftFilter1 === "Awaiting Approval") {
      return data1_addinfo?.getUnAcceptedBusinessInfoWPosts;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [openYey, setOpenYey] = useState(false);

  return (
    <div className={styles.part}>
      <p className="title">Businesses Admin Panel</p>
      <div className={styles.filters}>
        <div
          onClick={() => setLeftFilter1("All Businesses")}
          className={`text ${
            leftFilter1 == "All Businesses" ? styles.this : ""
          }`}
        >
          All Businesses
        </div>
        <div
          onClick={() => setLeftFilter1("Paid Posts")}
          className={`text ${leftFilter1 == "Paid Posts" ? styles.this : ""}`}
        >
          Paid Posts
        </div>
        <div
          onClick={() => setLeftFilter1("Awaiting Approval")}
          className={`text ${
            leftFilter1 == "Awaiting Approval" ? styles.this : ""
          }`}
        >
          Awaiting Approval
        </div>
        <div className={styles.sortby}>
          <div className={`text ${styles.button}`} onClick={toggleMenu}>
            <p>Sort by columns</p>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isOpen && (
            <div className={styles.menu}>
              <div onClick={() => setArgument1("createdAt")} className="text">
                Date
              </div>
              <div onClick={() => setArgument1("zipCode")} className="text">
                Zip Code
              </div>
              <div onClick={() => setArgument1("brandname")} className="text">
                Business
              </div>
              <div onClick={() => setArgument1("websiteLink")} className="text">
                Website
              </div>
              <div onClick={() => setArgument1("confirmed")} className="text">
                Action
              </div>
            </div>
          )}
        </div>
      </div>
      {loading1 ? (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date</th>
              <th className="text">Zip Code</th>
              <th className="text">Business</th>
              <th className="text">Website</th>
              <th className="text">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>
          <table className={styles.custom_table}>
            <thead>
              <tr>
                <th className="text">Date</th>
                <th className="text">Zip Code</th>
                <th className="text">Business</th>
                <th className="text">Website</th>
                <th className="text">Action</th>
              </tr>
            </thead>
            <tbody>
              {filterData()?.map((data, index) => (
                <tr key={index}>
                  <td className="text">{formatTimestamp(data.createdAt)}</td>
                  <td className="text">{data.zipCode}</td>
                  <td className="text">{data.brandname}</td>
                  <td className="text">{data.websiteLink}</td>
                  {/* <td className="text">{data.confirmed}</td> */}
                  {data.confirmed == "true" ? (
                    <td className="text">
                      <div className={styles.green}>Paid</div>
                    </td>
                  ) : (
                    <td className="text">
                      <div className={styles.yellow}>Awaiting</div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div className={styles.foot}>
        <IoIosArrowBack
          className={styles.arrow}
          onClick={() => {
            if (page1 > 1) {
              setPage1(page1 - 1);
            }
          }}
        />
        <input
          type="text"
          className="text"
          value={page1}
          onChange={(e) => setPage1(e.target.value)}
        />
        {/* <p className="text">Next page</p> */}
        <IoIosArrowForward
          className={styles.arrow}
          onClick={() => setPage1(page1 + 1)}
        />
      </div>
    </div>
  );
}
function PosterAdminPanel() {
  const [page1, setPage1] = useState(1);
  const [leftFilter1, setLeftFilter1] = useState("All Posters");
  const [argument1, setArgument1] = useState("createdAt");
  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useQuery(GET_POSTER_INFO_POSTS, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const {
    data: data1_signedup,
    loading: loading1_signedup,
    error: error1_signedup,
  } = useQuery(GET_ACCEPTED_POSTER_INFO_POSTS, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const {
    data: data1_addinfo,
    loading: loading1_addinfo,
    error: error1_addinfo,
  } = useQuery(GET_UNACCEPTED_POSTER_INFO_POSTS, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month}/${day} ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }${hours >= 12 ? "pm" : "am"}`;
    return formattedDate;
  };

  const filterData = () => {
    if (leftFilter1 === "All Posters") {
      return data1?.getPosterInfoWPosts;
    } else if (leftFilter1 === "Paid Posts") {
      return data1_signedup?.getAcceptedPosterInfoWPosts;
    } else if (leftFilter1 === "Awaiting Approval") {
      return data1_addinfo?.getUnAcceptedPosterInfoWPosts;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.part}>
      <p className="title">Posters Admin Panel</p>

      <div className={styles.filters}>
        <div
          onClick={() => setLeftFilter1("All Posters")}
          className={`text ${
            leftFilter1 == "All Businesses" ? styles.this : ""
          }`}
        >
          All Posters
        </div>
        <div
          onClick={() => setLeftFilter1("Paid Posts")}
          className={`text ${leftFilter1 == "Paid Posts" ? styles.this : ""}`}
        >
          Paid Posts
        </div>
        <div
          onClick={() => setLeftFilter1("Awaiting Approval")}
          className={`text ${
            leftFilter1 == "Awaiting Approval" ? styles.this : ""
          }`}
        >
          Awaiting Approval
        </div>
        <div className={styles.sortby}>
          <div className={`text ${styles.button}`} onClick={toggleMenu}>
            <p>Sort by columns</p>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isOpen && (
            <div className={styles.menu}>
              <div onClick={() => setArgument1("createdAt")} className="text">
                Date
              </div>
              <div onClick={() => setArgument1("fullname")} className="text">
                Username
              </div>
              <div
                onClick={() => setArgument1("selectedSocial")}
                className="text"
              >
                Selected Social
              </div>
              <div
                onClick={() => setArgument1("selectedReview")}
                className="text"
              >
                Selected Review
              </div>
              <div onClick={() => setArgument1("confirmed")} className="text">
                Action
              </div>
            </div>
          )}
        </div>
      </div>
      {loading1 ? (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date</th>
              <th className="text">Username</th>
              <th className="text">Selected Social</th>
              <th className="text">Selected Review</th>
              <th className="text">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date</th>
              <th className="text">Username</th>
              <th className="text">Selected Social</th>
              <th className="text">Selected Review</th>
              <th className="text">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData()?.map((data, index) => (
              <tr key={index}>
                <td className="text">{formatTimestamp(data.createdAt)}</td>
                <td className="text">{data.fullname}</td>
                <td className="text">{data.selectedSocial}</td>
                <td className="text">{data.selectedReview}</td>
                {/* <td className="text">{data.confirmed}</td> */}
                {data.confirmed == "true" ? (
                  <td className="text">
                    <div className={styles.green}>Paid</div>
                  </td>
                ) : (
                  <td className="text">
                    <div className={styles.yellow}>Awaiting</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.foot}>
        <IoIosArrowBack
          className={styles.arrow}
          onClick={() => {
            if (page1 > 1) {
              setPage1(page1 - 1);
            }
          }}
        />
        <input
          type="text"
          className="text"
          value={page1}
          onChange={(e) => setPage1(e.target.value)}
        />
        {/* <p className="text">Next page</p> */}
        <IoIosArrowForward
          className={styles.arrow}
          onClick={() => setPage1(page1 + 1)}
        />
      </div>
    </div>
  );
}
//done
function BusinessWholeAdminPanel() {
  const [page1, setPage1] = useState(1);
  const [leftFilter1, setLeftFilter1] = useState("All Businesses");
  const [argument1, setArgument1] = useState("createdAt");
  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useQuery(GET_BUSINESS_WHOLE_INFO, {
    variables: { argument: argument1, page: page1.toString() },
  });

  // const { data: data1_signedup, loading: loading1_signedup, error: error1_signedup } = useQuery(GET_ACCEPTED_POSTER_INFO_POSTS, {
  //   variables: { argument: argument1, page: page1.toString() },
  // });

  // const { data: data1_addinfo, loading: loading1_addinfo, error: error1_addinfo } = useQuery(GET_UNACCEPTED_POSTER_INFO_POSTS, {
  //   variables: { argument: argument1, page: page1.toString() },
  // });

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month}/${day} ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }${hours >= 12 ? "pm" : "am"}`;
    return formattedDate;
  };

  const filterData = () => {
    if (leftFilter1 === "All Businesses") {
      return data1?.getBusinesswWholeInfo;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [openYey, setOpenYey] = useState(false);

  return (
    <div className={styles.part}>
      <p className="title">Business Details Admin Panel</p>

      <AiFillEye className="b_button" onClick={() => setOpenYey(!openYey)} />

      <div className={styles.filters}>
        <div className={styles.sortby}>
          <div className={`text ${styles.button}`} onClick={toggleMenu}>
            <p>Sort by columns</p>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isOpen && (
            <div className={styles.menu}>
              <div onClick={() => setArgument1("createdAt")} className="text">
                Date Signed Up
              </div>
              <div onClick={() => setArgument1("brandname")} className="text">
                Business name
              </div>
              <div onClick={() => setArgument1("address")} className="text">
                Address
              </div>
              <div
                onClick={() => setArgument1("brandCompletedPosts")}
                className="text"
              >
                Total Posts
              </div>
              <div onClick={() => setArgument1("paidOut")} className="text">
                Total Paid Out
              </div>
            </div>
          )}
        </div>
      </div>
      {loading1 ? (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date Signed Up</th>
              <th className="text">Business name</th>
              <th className="text">Address</th>
              <th className="text">Total Posts</th>
              <th className="text">Total Paid Out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>
          {openYey ? (
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th className="text">Email</th>
                  <th className="text">Contact phone</th>
                  <th className="text">Post Price</th>
                  <th className="text">Website Link</th>
                  <th className="text">Pending Posts</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((data, index) => (
                  <tr key={index}>
                    <td className="text">{data.email}</td>
                    <td className="text">{data.phone}</td>
                    <td className="text">{data.postPrice}</td>
                    <td className="text">{data.websiteLink}</td>
                    <td className="text">{data.brandPendingPosts?.length}</td>
                    {/* <td className="text">{data.confirmed}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th className="text">Date Signed Up</th>
                  <th className="text">Business name</th>
                  <th className="text">Address</th>
                  <th className="text">Total Posts</th>
                  <th className="text">Total Paid Out</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((data, index) => (
                  <tr key={index}>
                    <td className="text">{formatTimestamp(data.createdAt)}</td>
                    <td className="text">{data.brandname}</td>
                    <td className="text">{data.address}</td>
                    <td className="text">{data.brandCompletedPosts.length}</td>
                    {data.paidOut ? (
                      <td className="text">${data.paidOut}</td>
                    ) : (
                      <td className="text">0</td>
                    )}
                    {/* <td className="text">{data.confirmed}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      <div className={styles.foot}>
        <IoIosArrowBack
          className={styles.arrow}
          onClick={() => {
            if (page1 > 1) {
              setPage1(page1 - 1);
            }
          }}
        />
        <input
          type="text"
          className="text"
          value={page1}
          onChange={(e) => setPage1(e.target.value)}
        />
        {/* <p className="text">Next page</p> */}
        <IoIosArrowForward
          className={styles.arrow}
          onClick={() => setPage1(page1 + 1)}
        />
      </div>
    </div>
  );
}
//done
function PosterWholeAdminPanel() {
  const [page1, setPage1] = useState(1);
  const [leftFilter1, setLeftFilter1] = useState("All Posters");
  const [argument1, setArgument1] = useState("createdAt");
  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useQuery(GET_POSTER_WHOLE_INFO, {
    variables: { argument: argument1, page: page1.toString() },
  });

  // const { data: data1_signedup, loading: loading1_signedup, error: error1_signedup } = useQuery(GET_ACCEPTED_POSTER_INFO_POSTS, {
  //   variables: { argument: argument1, page: page1.toString() },
  // });

  // const { data: data1_addinfo, loading: loading1_addinfo, error: error1_addinfo } = useQuery(GET_UNACCEPTED_POSTER_INFO_POSTS, {
  //   variables: { argument: argument1, page: page1.toString() },
  // });

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month}/${day} ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }${hours >= 12 ? "pm" : "am"}`;
    return formattedDate;
  };

  const filterData = () => {
    if (leftFilter1 === "All Posters") {
      return data1?.getPosterwWholeInfo;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [openYey, setOpenYey] = useState(false);

  return (
    <div className={styles.part}>
      <p className="title">Poster Details Admin Panel</p>
      <AiFillEye className="b_button" onClick={() => setOpenYey(!openYey)} />

      <div className={styles.filters}>
        <div className={styles.sortby}>
          <div className={`text ${styles.button}`} onClick={toggleMenu}>
            <p>Sort by columns</p>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isOpen && (
            <div className={styles.menu}>
              <div onClick={() => setArgument1("createdAt")} className="text">
                Date Signed Up
              </div>
              <div onClick={() => setArgument1("fullname")} className="text">
                Username
              </div>
              <div onClick={() => setArgument1("phone")} className="text">
                Contact Info
              </div>
              <div onClick={() => setArgument1("balance")} className="text">
                Balance
              </div>
              <div onClick={() => setArgument1("paidOut")} className="text">
                Total Paid Out to Date
              </div>
            </div>
          )}
        </div>
      </div>
      {loading1 ? (
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th className="text">Date Signed Up</th>
              <th className="text">Username</th>
              <th className="text">Contact Info</th>
              <th className="text">Balance</th>
              <th className="text">Total Paid Out to Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
            <tr>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
              <td className="text">Loading...</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>
          {openYey ? (
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th className="text">Email</th>
                  <th className="text">Completed Posts</th>
                  <th className="text">Pending posts</th>
                  <th className="text">Social Media</th>
                  <th className="text">Review Media</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((data, index) => (
                  <tr key={index}>
                    <td className="text">{data.email}</td>
                    <td className="text">{data.completedPosts?.length}</td>
                    <td className="text">{data.pendingPosts?.length}</td>
                    <td className="text">
                      {data.socialMedia?.instagram.name
                        ? `Instagram: ${data.socialMedia?.instagram.name}. `
                        : ""}
                      {data.socialMedia?.tiktok.name
                        ? `Tiktok: ${data.socialMedia?.tiktok.name}. `
                        : ""}
                      {data.socialMedia?.facebook.name
                        ? `Facebook: ${data.socialMedia?.facebook.name}. `
                        : ""}
                    </td>
                    <td className="text">
                      {data.reviewMedia?.google
                        ? `Google: ${data.reviewMedia?.google}. `
                        : ""}
                      {data.reviewMedia?.yelp
                        ? `Yelp: ${data.reviewMedia?.yelp}. `
                        : ""}
                      {data.reviewMedia?.tripadvisor
                        ? `Tripadvisor: ${data.reviewMedia?.tripadvisor}. `
                        : ""}
                    </td>
                    ``
                    {/* <td className="text">{data.socialMedia?.instagram}, {data.socialMedia?.tiktok}, {data.socialMedia?.facebook}</td> */}
                    {/* <td className="text">{data.reviewMedia?.tripadvisor}, {data.reviewMedia?.yelp}, {data.reviewMedia?.facebook}</td> */}
                    {/* <td className="text">{data.confirmed}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th className="text">Date Signed Up</th>
                  <th className="text">Username</th>
                  <th className="text">Contact Info</th>
                  <th className="text">Balance</th>
                  <th className="text">Total Paid Out to Date</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((data, index) => (
                  <tr key={index}>
                    <td className="text">{formatTimestamp(data.createdAt)}</td>
                    <td className="text">{data.fullname}</td>
                    <td className="text">{data.phone}</td>
                    <td className="text">${data.balance / 100}</td>
                    {data.paidOut ? (
                      <td className="text">${data.paidOut}</td>
                    ) : (
                      <td className="text">$0</td>
                    )}
                    {/* <td className="text">{data.confirmed}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      <div className={styles.foot}>
        <IoIosArrowBack
          className={styles.arrow}
          onClick={() => {
            if (page1 > 1) {
              setPage1(page1 - 1);
            }
          }}
        />
        <input
          type="text"
          className="text"
          value={page1}
          onChange={(e) => setPage1(e.target.value)}
        />
        {/* <p className="text">Next page</p> */}
        <IoIosArrowForward
          className={styles.arrow}
          onClick={() => setPage1(page1 + 1)}
        />
      </div>
    </div>
  );
}

function BanComponent() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [ban] = useMutation(BAN_USER, {
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    onCompleted: (data) => {
      Swal.fire({
        icon: "success",
        title: `Success!`,
      });
    },
    variables: {
      email,
      text,
    },
  });
  return (
    <div className={styles.inline_form}>
      <p className="pretitle">Ban user</p>
      <p className="nav_text">Email</p>
      <input
        type="text"
        className="a_input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="nav_text">Description</p>
      <input
        type="text"
        className="a_input"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="b_button" onClick={() => ban()}>
        Block user
      </button>
    </div>
  );
}

function UnBanComponent() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [unban] = useMutation(UN_BAN_USER, {
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    onCompleted: (data) => {
      Swal.fire({
        icon: "success",
        title: `Success!`,
      });
    },
    variables: {
      email,
      text,
    },
  });
  return (
    <div className={styles.inline_form}>
      <p className="pretitle">Unban user</p>
      <p className="nav_text">Email</p>
      <input
        type="text"
        className="a_input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="nav_text">Reason</p>
      <input
        type="text"
        className="a_input"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="b_button" onClick={() => unban()}>
      Unban the user
      </button>
    </div>
  );
}

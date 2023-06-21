import Link from "next/link";
import styles from "../Login/Login.module.scss";
import { useState, useContext, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../../../hooks/AuthContext";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import {
  LOGIN_USER,
  POSTER_COMPLETE_REGISTER,
  REGISTER_USER,
} from "../../../apollo/auth";
import Image from "next/image";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { setUserInfo } from "../../../redux/slices/userInfo";
export default function SignUpPosterCom() {
  const [images, setImage] = useState([]);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageCaptcha, setMessageCaptcha] = useState("");
  const [isStart, setIsStart] = useState(true);
  const [posterId, setPosterId] = useState("");
  const dispatch = useDispatch();
  const [tiktokUserName, setTiktokUserName] = useState("");
  const [tiktokFollowers, setTiktokFollowers] = useState("");
  const [instagramUserName, setInstagramUserName] = useState("");
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookUserName, setFacebookUserName] = useState("");
  const [facebookFollowers, setFacebookFollowers] = useState("");
  const [yelpReview, setYelpReview] = useState("");
  const [tripadvisorReview, setTripadvisorReview] = useState("");
  const [googleReview, setGoogleReview] = useState("");

  useEffect(() => {
    if (!isChecked1 || !isChecked2) {
      setMessageError(() => "Accept Terms is required!");
    } else {
      setMessageError(() => "");
    }
  }, [isChecked1, isChecked2]);

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleCaptchaChange = () => {
    setIsCaptcha(!isCaptcha);
  };

  const context = useContext(AuthContext) || "";
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.userInfo);
  {
    userInfo ? router.push("/") : "";
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    fullname: Yup.string().required("Fullname is required"),
    phone: Yup.string()
      .required("Phone is required")
      .min(5, "Password must be at least 5 characters")
      .max(40, "Password must not exceed 40 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirm_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [data, setData] = useState();

  const onSubmit1 = (data, event) => {
    //TODO CHange     if (!isCaptcha) {
    if (isCaptcha) {
      setMessageCaptcha(() => "Captcha is required!");
    } else {
      event.preventDefault();
      setData(data);

      setTimeout(() => registerUser(), 500);
      // setTimeout(() => console.log(data), 500)
    }
  };

  const onSubmit2 = (data) => {
    event.preventDefault();
    setTimeout(() => completeRegister(), 500);
    // setTimeout(() => loginUser(), 500)
  };
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
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
      setIsStart(!isStart);
      setPosterId(data.registerUser.user.id);
    },
    variables: { about: data },
  });
  const [completeRegister] = useMutation(POSTER_COMPLETE_REGISTER, {
    update(proxy, { data: { registerUserComplete: userData } }) {
      context.login(userData);
    },
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
      dispatch(setUserInfo(data.registerUserComplete.user));
      router.push("/personal/poster");
    },
    // variables: { registerUserCompleteId: posterId, social: {tiktokUserName, tiktokFollowers, instagramUserName, instagramFollowers, facebookUserName, facebookFollowers}},
    variables: {
      registerUserCompleteId: posterId,
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
  const props = {
    name: "file",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setImage((prevImage) => [...prevImage, file.originFileObj]); // Добавляем новые файлы к существующему состоянию image
      }
    },
  };
  return (
    <div className={styles.back}>
      {isStart ? (
        <>
          <p className={`pretitle ${styles.pretitle}`}>
            Welcome to the Poster Sign Up Page!
          </p>
          <p className={`text ${styles.text}`}>
            {" "}
            Posters can explore various Businesses on the platform and choose
            the ones that interest them to post about. Post authors then create
            a post on one of their approved social media platforms and follow
            the instructions on the post page to submit it for review. Once
            approved, then the Poster gets paid into their account. These funds
            (minus our percentage) are available for payment to the poster upon
            request. Payments are made via Paypal/Stripe to your email address,
            see policy for more information details.
          </p>
          <form onSubmit={handleSubmit(onSubmit1)} className={styles.form}>
            <div>
              <input
                name="fullname"
                type="text"
                {...register("fullname")}
                placeholder="Fullname"
                required
                className={`a_input ${errors.fullname ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.fullname?.message}</p>
            </div>
            <div>
              <input
                name="email"
                type="email"
                required
                {...register("email")}
                placeholder="Your email"
                className={`a_input ${errors.email ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.email?.message}</p>
            </div>
            <div>
              <input
                name="phone"
                type="tel"
                id="phone"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                {...register("phone")}
                placeholder="Your phone"
                className={`a_input ${errors.phone ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.phone?.message}</p>
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                {...register("password")}
                placeholder="Your password"
                className={`a_input ${errors.password ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.password?.message}</p>
            </div>
            <div>
              <input
                name="confirm_password"
                type="password"
                {...register("confirm_password")}
                placeholder="Confirm password"
                className={`a_input ${
                  errors.confirm_password ? "is-invalid" : ""
                }`}
              />
              <p className={styles.errors}>
                {errors.confirm_password?.message}
              </p>
            </div>
            <div className="a_instrusctions">
              <p>Privacy and Policy</p>
              <p>Wording for policy...</p>
            </div>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={isChecked1}
                required
                onChange={handleCheckboxChange1}
              />
              <span className="checkmark"></span>
              You confirm that you are at least 18 years old
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={isChecked2}
                required
                onChange={handleCheckboxChange2}
              />
              <span className="checkmark"></span>
              {/* <Link href="/privacy" style={{ textDecoration: "underLine" }}> */}
              You agree to all site policies and privacy rules
              {/* </Link> */}
            </label>
            <p className={styles.errors}>{messageError}</p>
            {/* <ReCAPTCHA
              sitekey="6LcBFlwmAAAAAJWblnjYhb4ftrng3BghULF6hy8I"
              onChange={handleCaptchaChange}
              // aria-required
            /> */}
            <p className={styles.errors}>{messageCaptcha}</p>
            <button type="submit" className={`b_button ${styles.b_button}`}>
              Next
            </button>
          </form>
        </>
      ) : (
        <>
          <p className={`pretitle ${styles.pretitle}`}>
            Poster Social Details Page
          </p>
          <div className="a_instrusctions">
            <p>
              • Kindly confirm the social media platforms on which you intend to
              make your posts.
              <br />
              • Then add your username or handle, number of has been followers
              and a screenshot of your homepage.
              <br />• For your convenience, a check box has been provided for
              each platform, enabling you to select the social sites you wish to
              post on.{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit2)} className={styles.form}>
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
              <p className="text">Screenshot of your social</p>
              {/* <input
                className={`b_button ${styles.custom_input}`}
                type="file"
              /> */}
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
              <p className="text">Screenshot of your social</p>
              {/* <input
                className={`b_button ${styles.custom_input}`}
                type="file"
              /> */}
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
              <p className="text">Screenshot of your social</p>
              {/* <input
                className={`b_button ${styles.custom_input}`}
                type="file"
              /> */}
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
            <div className="a_instrusctions">
              <p>
                • Please select which review sites you are signed for and enter
                your review sites username.
                <br />• If you have a Gmail account you can automatically leave
                a google review. Please enter your google account name.
              </p>
            </div>
            <div className={styles.social_input}>
              <Image src="/google.svg" width={40} height={40} alt="google" />
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
                <p className="navtext">Don't have an account?</p>
                <button className={`b_button`}>Sign up</button>
              </a>
            </div>
            <div className={styles.social_input}>
              <Image src="/yelp.svg" width={40} height={40} alt="yelp" />
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
                <p className="navtext">Don't have an account?</p>
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
                <p className="navtext">Don't have an account?</p>
                <button className={`b_button`}>Sign up</button>
              </a>
            </div>
            <button
              type="submit"
              // disabled={messageError == "" ? false : true}
              className={`b_button ${styles.b_button}`}
            >
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
}

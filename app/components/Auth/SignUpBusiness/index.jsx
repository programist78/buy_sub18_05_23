import styles from "./SignUpBusiness.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LOGIN_USER, REGISTER_USER } from "../../../apollo/auth";
import { AuthContext } from "../../../hooks/AuthContext";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CiLogin } from "react-icons/ci";


import Swal from "sweetalert2";
import { useState, useContext, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { setUserInfo } from "../../../redux/slices/userInfo";
export default function SignUpBusiness() {
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageCaptcha, setMessageCaptcha] = useState("");


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
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const context = useContext(AuthContext) || "";
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.userInfo);
  {
    userInfo ? router.push("/") : "";
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirm_password: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
    fullname: Yup.string().required("Fullname is required"),
    brandname: Yup.string().required("Business name is required!"),
    websiteLink: Yup.string(),
    // phone: Yup.string()
    //   .required("Phone is required")
    //   .min(5, "Password must be at least 5 characters")
    //   .max(40, "Password must not exceed 40 characters"),
    // address: Yup.string().required("Phone is required"),
    
  });

  const handleCaptchaChange = () => {
    setIsCaptcha(!isCaptcha);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [data, setData] = useState();

  const onSubmit1 = (data) => {
    if (isCaptcha){
      setMessageCaptcha(() => "Captcha is required!");
    } else{
      // event.preventDefault();
      setData(data);
      setTimeout(() => registerUser(), 500);
      // setTimeout(() => console.log(data), 500)
    }
  };
  const dispatch = useDispatch()

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      router.reload()
      dispatch(setUserInfo(userData));
      router.push("/personal/business")
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
        title: `Loading`,
      });
    },
    variables: { about: data },
  });
  return (
    <div className={styles.back}>
      <form onSubmit={handleSubmit(onSubmit1)} className={styles.back}>
        <p className="title">Information about your Business</p>
        <div className={styles.parts}>
          <div className={styles.part1}>
            <p className={`text ${styles.text}`}>
              With the POST FOR DOLLARS platform you set a fixed price you pay
              creators. We show you the creator's post and review prior to your
              approval to pay. You can also view some past posts, download them
              if you want, monitor costs and results. Once approved POST FOR
              DOLLARS earns a 30% commission per approval from the total price
              you have set. No additional fees. Stop using anytime with no
              cancellation fee. Simple and easy the way business should be.
            </p>
            <div className="a_instrusctions">
              <p>Privacy and Policy</p>
              <p>Wording for policy...</p>
            </div>
            <p className={`text ${styles.text}`} style={{ opacity: 0.75 }}>
              Unless payment with a credit card is used by you then a 3%
              transaction fee will be added
            </p>
          </div>
          <div className={styles.part2}>
            <div>
              <input
                name="email"
                type="text"
                {...register("email")}
                placeholder="Your email"
                className={`a_input ${errors.email ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.email?.message}</p>
            </div>
            <div>
              <input
                name="password"
                type="password"
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
            <div>
              <input
                name="fullname"
                type="text"
                {...register("fullname")}
                placeholder="Contact full name"
                className={`a_input ${errors.fullname ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.fullname?.message}</p>
            </div>
            <div>
              <input
                name="brandname"
                type="text"
                {...register("brandname")}
                placeholder="Business name"
                className={`a_input ${errors.brandname ? "is-invalid" : ""}`}
              />
            </div>
            {/* <div>
              <input
                name="phone"
                type="text"
                {...register("phone")}
                placeholder="Phone number"
                className={`a_input ${errors.phone ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.phone?.message}</p>
            </div> */}
            {/* address */}
            {/* <div>
              <input
                name="address"
                type="text"
                {...register("address")}
                placeholder="Business address"
                className={`a_input ${errors.address ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.address?.message}</p>
            </div> */}
            <div>
              <input
                name="websiteLink"
                type="text"
                {...register("websiteLink")}
                placeholder="Your website link(if you have one)"
                className={`a_input ${errors.websiteLink ? "is-invalid" : ""}`}
              />
            </div>

            <label className="checkbox">
              <input
                type="checkbox"
                name="checkbox1"
                // required
                checked={isChecked1}
                onChange={handleCheckboxChange1}
              />
              <span className="checkmark"></span>
              You confirm that you are at least 18 years old
            </label>
            <label className="checkbox">
              <input
                name="checkbox2"
                type="checkbox"
                // required
                checked={isChecked2}
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
            /> */}
            <p className={styles.errors}>{messageCaptcha}</p>
          </div>
        </div>
        <button type="submit" className={`b_button ${styles.b_button}`}>
          Register
        </button>
      </form>
    </div>
  );
}

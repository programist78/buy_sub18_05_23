import styles from "../Login/Login.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SEND,
  LOGIN_USER,
  SEND_CONFIRMED_EMAIL,
} from "../../../apollo/auth";
import { AuthContext } from "../../../hooks/AuthContext";
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { CiLogin } from "react-icons/ci";
import Swal from "sweetalert2";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
function ForgotPasswordCom() {
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const context = useContext(AuthContext) || "";
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.userInfo);
  {
    userInfo ? router.push("/") : "";
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(40, "Password must not exceed 40 characters"),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    confirmationCode: Yup.string().required("Type your code"),
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

  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD, {
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
    variables: data,
  });

  const [sendConfirmedEmail] = useMutation(FORGOT_PASSWORD_SEND, {
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    onCompleted: (data) => {
      setSendEmail(!sendEmail);
    },
    variables: { email },
  });

  const sendEmailForget = (data) => {
    sendConfirmedEmail();
  };

  const onSubmit = (data) => {
    setData(data);
    setTimeout(() => forgotPassword(), 500);
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <div className={styles.back}>
      <p className={`pretitle ${styles.pretitle}`}>Forgot Password</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {!sendEmail ? (
          <div className={styles.form}>
            <div>
              <input
                name="email"
                type="email"
                required
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`a_input ${errors.email ? "is-invalid" : ""}`}
              />
              <p className={styles.errors}>{errors.email?.message}</p>
            </div>
            <ReCAPTCHA
              sitekey="6LcBFlwmAAAAAJWblnjYhb4ftrng3BghULF6hy8I"
              onChange={onChange}
            />
            <button
              className={`b_button ${styles.b_button}`}
              onClick={() => sendEmailForget()}
            >
              Send
            </button>
          </div>
        ) : (
          <>
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
            We've sent you a verification code.
            <div>
              <input
                name="confirmationCode"
                type="text"
                {...register("confirmationCode")}
                placeholder="Your code"
                className={`a_input ${
                  errors.confirmationCode ? "is-invalid" : ""
                }`}
              />
              <p className={styles.errors}>
                {errors.confirmationCode?.message}
              </p>
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
            <button
              onClick={() => onSubmit()}
              className={`b_button ${styles.b_button}`}
            >
              Log In
            </button>
          </>
        )}
      </form>
      {/* <Link href="/auth/forgot-password" style={{textDecoration: "underline"}}><p className={`text ${styles.small_text}`}>Forgot Password?</p></Link> */}
      <p className={`text ${styles.text}`}>
        Dont have an account?{" "}
        <Link href="/auth/sign-up" style={{ textDecoration: "underline" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordCom;

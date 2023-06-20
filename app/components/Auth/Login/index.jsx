import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LOGIN_USER } from "../../../apollo/auth";
import { AuthContext } from "../../../hooks/AuthContext";
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CiLogin } from "react-icons/ci";
import Swal from "sweetalert2";
import Link from "next/link";
import { setUserInfo } from "../../../redux/slices/userInfo";
function LoginCom() {
  const dispatch = useDispatch();
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

  const onSubmit = (data) => {
    setData(data);
    setTimeout(() => loginUser(), 500);
  };
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);

    },
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },
    onCompleted: (data) => {
      // Swal.fire({
      //   icon: "success",
      //   title: `Loading`,
      //   showConfirmButton: false,
      //   time: 1000
      // });
      dispatch(setUserInfo(data.loginUser.user));
      if (data.loginUser.user.role == "USER") {
        router.push("/personal/poster");
      } else if (data.loginUser.user.role == "BUSINESS") {
        router.push("/personal/business");
      } else if (data.loginUser.user.role == "ADMIN") {
        router.push("/personal/admin");
      }
    },
    variables: { about: data },
  });

  return (
    <div className={styles.back}>
      <p className={`pretitle ${styles.pretitle}`}>Login</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <button type="submit" className={`b_button ${styles.b_button}`}>
          Log In
        </button>
      </form>
      <Link
        href="/auth/forgot-password"
        style={{ textDecoration: "underline" }}
      >
        <p className={`text ${styles.small_text}`}>Forgot Password?</p>
      </Link>
      <p className={`text ${styles.text}`}>
        Dont have an account?{" "}
        <Link href="/auth/poster-sign-up" style={{ textDecoration: "underline" }}>
          Sign up Poster
        </Link>
        <br />{" "}
        <Link href="/auth/business-sign-up" style={{ textDecoration: "underline" }}>
          Sign up Business
        </Link>
      </p>
    </div>
  );
}

export default LoginCom;

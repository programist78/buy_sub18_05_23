import Link from "next/link";
import styles from "../Login/Login.module.scss";
import { useState, useContext, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../../../hooks/AuthContext";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "@apollo/client";
import {LOGIN_USER} from '../../../apollo/auth'
import Image from "next/image";

export default function SignUpPosterCom() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [messageError, setMessageError] = useState("")
  const [isStart, setIsStart] = useState(true)

  useEffect(() => {
    if (!isChecked1 || !isChecked2) {
      setMessageError(() => "Accept Terms is required!")
    } else {
      setMessageError(() => "")
    }
  }, [isChecked1, isChecked2])
  


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
  const { auth } = useSelector((state) => state.auth);
  {auth ? router.push('/') : ""}
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
    fullname: Yup.string()
    .required('Fullname is required'),
    phone: Yup.string()
    .required('Phone is required')
    .min(5, 'Password must be at least 5 characters')
    .max(40, 'Password must not exceed 40 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(40, 'Password must not exceed 40 characters'),
    confirmpassword: Yup
    .string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
} = useForm({
  resolver: yupResolver(validationSchema)
});

const [data, setData] = useState()

const onSubmit = data => {
  setData(data)
  setIsStart(!isStart)
  // setTimeout(() => loginUser(), 500)
};
const [loginUser, {loading}] = useMutation(LOGIN_USER, {
      
  update(proxy, { data: {loginUser: userData}}){
      context.login(userData)
      router.push('/');
  },
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
  variables: { about: data  },
});


  return (
    // <div className={styles.back}>
    //     {isStart ?
    //     <>
    //   <p className="pretitle">Welcome to the Poster Sign Up Page!</p>
    //   <p className="text"></p>
    //     <input type="text" placeholder="Fullname" />
    //     <input type="text" placeholder="Your email" />
    //     <input type="text" placeholder="Phone" />
    //     <input type="password" placeholder="Password" />
    //     <input type="password" placeholder="Confirm Password" />
    //     <p className="text">We've sent you confirmation to your profile</p>
    //     <div className="a_instrusctions">
    //       <p>Privacy and Policy</p>
    //       <p>Wording for policy...</p>
    //     </div>
    //     <label className="checkbox">
    //       <input
    //         type="checkbox"
    //         checked={isChecked}
    //         onChange={handleCheckboxChange}
    //       />
    //       <span className="checkmark"></span>
    //       You confirm that you are at least 18 years old
    //     </label>
    //     <label className="checkbox">
    //       <input
    //         type="checkbox"
    //         checked={isChecked}
    //         onChange={handleCheckboxChange}
    //       />
    //       <span className="checkmark"></span>
    //       <Link href="/privacy" style={{textDecoration: "underLine"}}>You agree to all site policies and privacy rules</Link>
    //       <ReCAPTCHA
    //         sitekey="6LcBFlwmAAAAAJWblnjYhb4ftrng3BghULF6hy8I"
    //         onChange={onChange}
    //         />
    //       <button className={`b_button ${styles.custom_input}`}>Next</button>
    //     </label>
    //   
    //   </> 
    //   :
    //   <>

    //   </>
    //   }
    // </div>
    <div className={styles.back}>
      {isStart ?
      <>
    <p className={`pretitle ${styles.pretitle}`}>Welcome to the Poster Sign Up Page!</p>
    <p className={`text ${styles.text}`} > Posters can explore various businesses on the platform and choose the ones that interest them to post about. 
Payments are made via Paypal/Stripe to your email address see  policy for more information details.
Post authors then create a post on one of their approved social media platforms and follow the instructions on the post page to submit it for review.
 Once approved, then the Poster gets paid into their account. These funds (minus our percentage) are available for payment to the poster upon request.</p>
  <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <div>
      <input
        name="fullname"
        type="text"
        {...register('fullname')}
        placeholder='Fullname'
        className={`a_input ${errors.fullname ? 'is-invalid' : ''}`}
      />
      <p className={styles.errors}>{errors.fullname?.message}</p>
    </div>
    <div>
      <input
        name="email"
        type="text"
        {...register('email')}
        placeholder='Your email'
        className={`a_input ${errors.email ? 'is-invalid' : ''}`}
      />
      <p className={styles.errors}>{errors.email?.message}</p>
    </div>
    <div>
      <input
        name="phone"
        type="text"
        {...register('phone')}
        placeholder='Your phone'
        className={`a_input ${errors.phone ? 'is-invalid' : ''}`}
      />
      <p className={styles.errors}>{errors.phone?.message}</p>
    </div>
    <div>
      <input
        name="password"
        type="password"
        {...register('password')}
        placeholder='Your password'
        className={`a_input ${errors.password ? 'is-invalid' : ''}`}
      />
      <p className={styles.errors}>{errors.password?.message}</p>
    </div>
    <div>
      <input
        name="confirmpassword"
        type="text"
        {...register('confirmpassword')}
        placeholder='Confirm password'
        className={`a_input ${errors.confirmpassword ? 'is-invalid' : ''}`}
      />
      <p className={styles.errors}>{errors.confirmpassword?.message}</p>
      <p >We've sent you confirmation to your email.</p>
    </div>
    <div className="a_instrusctions">
        <p>Privacy and Policy</p>
       <p>Wording for policy...</p>
        </div>
    <label className="checkbox">
          <input
            type="checkbox"
            checked={isChecked1}
            onChange={handleCheckboxChange1}
          />
          <span className="checkmark"></span>
          You confirm that you are at least 18 years old
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={isChecked2}
            onChange={handleCheckboxChange2}
          />
          <span className="checkmark"></span>
          <Link href="/privacy" style={{textDecoration: "underLine"}}>You agree to all site policies and privacy rules</Link>
          </label>
          <p className={styles.errors}>{messageError}</p>
          <ReCAPTCHA
            sitekey="6LcBFlwmAAAAAJWblnjYhb4ftrng3BghULF6hy8I"
            onChange={onChange}
            />
    <button type="submit" className={`b_button ${styles.b_button}`}>
        Next
    </button>
  </form>
  </>
  :
  <>
  <p className={`pretitle ${styles.pretitle}`}>Poster Social Details Page</p>
  <div className="a_instrusctions">
      <p>• Kindly confirm the social media platforms on which you intend to make your posts. 
        <br />
        • Then add your username or handle, number of has been followers and a screenshot of your homepage.
<br />
• For your convenience, a check box has been provided for each platform, enabling you to select the social sites you wish to post on. </p>
      </div>
<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
  <div className={styles.social_input}>
    <Image src="/facebook.svg" width={40} height={40}/>
    <input className={`a_input ${styles.nick_input}`} type="text" placeholder="Your Facebook Username"/>
    <input type="text" className={`a_input ${styles.number_input}`} placeholder="Number of your friends"/>
    <Image src="/file_download.svg" width={40} height={40}/>
    <p className="text">Screenshot of your social</p>
    <input className={`b_button ${styles.custom_input}`} type="file" />
  </div>
  <div className={styles.social_input}>
    <Image src="/instagram.svg" width={40} height={40} />
    <input type="text" className={`a_input ${styles.nick_input}`} placeholder="Your instagram Username"/>
    <input type="text" className={`a_input ${styles.number_input}`} placeholder="Number of your followers"/>
    <Image src="/file_download.svg" width={40} height={40}/>
    <p className="text">Screenshot of your social</p>
    <input className={`b_button ${styles.custom_input}`} type="file" />
  </div>
  <div className={styles.social_input}>
    <Image src="/tiktok.svg" width={40} height={40} />
    <input type="text" className={`a_input ${styles.nick_input}`} placeholder="Your TikTok Username"/>
    <input type="text" className={`a_input ${styles.number_input}`} placeholder="Number of your followers"/>
    <Image src="/file_download.svg" width={40} height={40}/>
    <p className="text">Screenshot of your social</p>
    <input className={`b_button ${styles.custom_input}`} type="file" />
  </div>
  <div className="a_instrusctions">
      <p>• Please select which review sites you are signed for and enter your review sites username. 
        <br />
        • If you have a Gmail account you can automatically leave a google review. Please enter your google account name.</p>
      </div>
      <div className={styles.social_input}>
    <Image src="/google.svg" width={40} height={40} />
    <input type="text" className="a_input" placeholder="Your Google"/>
    <input className={`b_button ${styles.custom_input}`} type="file" />
  </div>
  <div className={styles.social_input}>
    <Image src="/yelp.svg" width={40} height={40} />
    <input type="text" className="a_input" placeholder="Your yelp"/>
    <input className={`b_button ${styles.custom_input}`} type="file" />
  </div>
  <div className={styles.social_input}>
    <Image src="/tripadvisor.svg" width={40} height={40} />
    <input type="text" className="a_input" placeholder="Your Tripadvisor"/>
    <input className={`b_button ${styles.custom_input}`} type="file" />
  </div>
  <button type="submit" disabled={messageError == "" ? false : true}
 className={`b_button ${styles.b_button}`}>
      Register
  </button>
</form>
</>}
</div>
  );
}

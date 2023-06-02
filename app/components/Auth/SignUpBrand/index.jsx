import styles from './SignUpBrand.module.scss'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {LOGIN_USER} from '../../../apollo/auth'
import { AuthContext } from '../../../hooks/AuthContext';
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {CiLogin} from 'react-icons/ci'
import Swal from "sweetalert2"
import { useState, useContext, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";import Link from 'next/link';
export default function SignUpBrand() {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [messageError, setMessageError] = useState("")
  
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
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters')
      .max(40, 'Password must not exceed 40 characters'),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    fullname: Yup.string()
    .required('Fullname is required'),
    phone: Yup.string()
    .required('Phone is required')
    .min(5, 'Password must be at least 5 characters')
    .max(40, 'Password must not exceed 40 characters'),
    address: Yup.string()
    .required('Phone is required'),
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
    setTimeout(() => loginUser(), 500)
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
    <div className={styles.back}>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.back}>
            <p className='title'>Information about your brand</p>
            <div className={styles.parts}>
        <div className={styles.part1}>
            <p className={`text ${styles.text}`}>With the POST FOR DOLLARS platform you set a fixed price you pay creators. We show you the creator's post and review prior to your approval to pay. You can also view some past posts, download them if you want, monitor costs and results. Once approved POST FOR DOLLARS earns a 30% commission per approval from the total price you have set. No additional fees. Stop using anytime with no cancellation fee. Simple and easy the way business should be.</p>
            <div className="a_instrusctions">
                <p>Privacy and Policy</p>
            <p>Wording for policy...</p>
            </div>
            <p className={`text ${styles.text}`} style={{opacity: 0.75}}>Unless payment with a credit card is used by you then a 3% transaction fee will be added</p>
        </div>
        <div className={styles.part2}>
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
    </div>
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
        name="phone"
        type="text"
        {...register('phone')}
        placeholder='Phone number'
        className={`a_input ${errors.phone ? 'is-invalid' : ''}`}
      />
      <p className={styles.errors}>{errors.phone?.message}</p>
    </div>
    <div>
      <input
        name="address"
        type="text"
        {...register('address')}
        placeholder='Business address'
        className={`a_input ${errors.address ? 'is-invalid' : ''}`}
      />
      <p className={styles.errors}>{errors.address?.message}</p>
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
        </div>
        </div>
        <button type="submit" className={`b_button ${styles.b_button}`}>
            Register
        </button>
      </form>
        </div>

  )
}

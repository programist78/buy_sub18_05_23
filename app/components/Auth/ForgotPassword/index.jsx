import styles from '../Login/Login.module.scss'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {LOGIN_USER} from '../../../apollo/auth'
import { AuthContext } from '../../../hooks/AuthContext';
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {CiLogin} from 'react-icons/ci'
import Swal from "sweetalert2"
import Link from 'next/link';
function ForgotPasswordCom() {
    const [sendEmail, setSendEmail] = useState(false)
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
  const sendEmailForget = data => {
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
        <p className={`pretitle ${styles.pretitle}`}>Forgot Password</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {!sendEmail ?
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <button
            className={`b_button ${styles.b_button}`}
            type="submit" 
          >Send</button>
        </form>
        :
        <>
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
        We've sent you a verification code.
        <div>
    
    <input
      name="code"
      type="code"
      {...register('code')}
      placeholder='Your code'
      className={`a_input ${errors.code ? 'is-invalid' : ''}`}
    />
    <p className={styles.errors}>{errors.code?.message}</p>
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

        <button type="submit" className={`b_button ${styles.b_button}`}>
            Log In
        </button>
        </>
    }

        
      </form>
      <Link href="/auth/forgot-password" style={{textDecoration: "underline"}}><p className={`text ${styles.small_text}`}>Forgot Password?</p></Link>
      <p className={`text ${styles.text}`}>Dont have an account? <Link href="/auth/sign-up" style={{textDecoration: "underline"}}>Sign up</Link></p>
    </div>
  );
};

export default ForgotPasswordCom;
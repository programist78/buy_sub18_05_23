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
    completeRegister({    variables: {
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
    }})
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
    onCompleted: async (data) => {
      try {
        if (data.registerUserComplete.user) {
          Swal.fire({
            icon: "success",
            title: `Redirecting...`,
          });
          await router.push("/personal/poster");
        }  else {
          throw new Error("Invalid user");
        }
        await dispatch(setUserInfo(data.registerUserComplete.user));
      } catch (error) {
        console.error(error);
      }
      // Dispatch the action to save user info
    },
    // variables: { registerUserCompleteId: posterId, social: {tiktokUserName, tiktokFollowers, instagramUserName, instagramFollowers, facebookUserName, facebookFollowers}},

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
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Terms and Conditions - Posters
              </p>
              <p>
                <br />
                Welcome to POSTFORDOLLARS.COM! These Terms and Conditions govern
                your use of our website as a poster engaging in services
                provided by PFD LLC. Please read them carefully before using our
                website or engaging in any activities on it.
                <br />
                <br />
                1. Acceptance of Terms
                <br />
                By accessing or using our website, you agree to be bound by
                these Terms and Conditions, including any additional terms and
                conditions and policies referenced herein. If you do not agree
                with any part of these Terms and Conditions, you should not use
                our website.
                <br />
                <br />
                2. Description of Service
                <br />
                PFD LLC through POSTFORDOLLARS.com provides a platform that
                connects individuals ("Posters") who create social media posts
                with businesses ("Clients") that want to promote their products
                or services. Posters are compensated for their posts(if
                approved), which become the property of PFD LLC and can be used
                by the Clients.
                <br />
                <br />
                3. Eligibility
                <br />
                By using our website as a Poster, you represent and warrant that
                you are at least 18 years of age and have the legal capacity to
                enter into binding contracts. If you are accessing or using our
                website on behalf of a company, organization, or other entity,
                you represent and warrant that you have authority to bind such
                entity to these Terms and Conditions.
                <br />
                <br />
                4. User Accounts
                <br />
                To use certain features of our website and be compensated or
                rebated, you are required to create a valid and eligible user
                account. You are responsible for maintaining the confidentiality
                of your account information, including your username and
                password. You agree to accept responsibility for all activities
                that occur under your account.
                <br />
                <br />
                5. Compensation and Ownership of Posts
                <br />
                As a Poster, you may be compensated or rebated for the social
                media posts you create on behalf of Clients. This compensation
                or rebate is only due upon approval and receipt of payment by
                the business at their discretion. We at PFD LLC also have full
                discretion and authority to accept or reject posts. The amount
                of net compensation is listed on that particular businesses
                section of the PostForDollars.com website. As a Poster you may
                only be compensated for posting for each business once per month
                per social media site and review site unless directed otherwise.
                Some businesses will only allow one post per Poster in total or
                some other limit. Compensation or rebate shall be placed in a
                credit account meaning the approved funds are available for
                payment to the poster upon request. Credit account shall be
                deducted $5.00 per month if no activity is on the account for 60
                days. Payment shall be paid to poster only from approved
                provided payment account done via the PostForDollars.com
                website. Once a post is submitted, it becomes the property of
                PFD LLC and can be used by the respective Client for promotional
                purposes. You agree to grant PFD LLC and the Clients a
                worldwide, royalty-free, non-exclusive, transferable, and
                sub-licensable right to use, reproduce, modify, adapt, publish,
                distribute, and display your posts. If compensation or rebate
                for a calendar year exceeds $550.00 then before any additional
                approved funds are dispersed from a Poster’s account a w-9 tax
                form might be requested to be completed and submitted. Posters
                are not employees of PFD LLC and shall not be construed as such.
                <br />
                <br />
                6. Prohibited Conduct
                <br />
                When using our website, you agree not to:
                <br />
                a. Violate any applicable laws, regulations, or third-party
                rights.
                <br />
                b. Use our website for any unauthorized or illegal purpose.
                <br />
                c. Engage in any activity that could damage, disable, or impair
                the operation or security of our website.
                <br />
                d. Use any automated system or software to access or interact
                with our website without our express written permission.
                <br />
                e. Share any content that is infringing, defamatory, obscene,
                sexually explicit or harmful.
                <br />
                <br />
                7. Limited License to Use the Website
                <br />
                Subject to your compliance with these Terms and Conditions, PFD
                LLC grants you a limited, non-exclusive, non-transferable, and
                revocable license to access and use the website for its intended
                purposes. This license does not include any right to download,
                copy, modify, or distribute the content on the website, except
                as expressly authorized by PFD LLC. to be clear your permission
                to use this website may be revoked at the sole discretion of PFD
                LLC.
                <br />
                <br />
                8. Unauthorized Uses of the Site
                <br />
                You agree not to engage in any unauthorized use of the website,
                including but not limited to:
                <br />
                a. Accessing or attempting to access areas of the website that
                are not intended for public access.
                <br />
                b. Circumventing or disabling any security or authentication
                measures on the website.
                <br />
                c. Interfering with or disrupting the operation of the website
                or the servers hosting it.
                <br />
                d. Engaging in any activity that could impose an unreasonable
                burden on the infrastructure of the website.
                <br />
                <br />
                9. Identity Verification
                <br />
                PFD LLC may require you to verify your identity in order to
                access certain features or services on the website. You agree to
                provide accurate and up-to-date information for identity
                verification purposes, and you acknowledge that PFD LLC may
                suspend or terminate your access if you fail to comply with
                these requirements.
                <br />
                <br />
                10. Limitations on Communications and Use of Other Users'
                Information; No Spam
                <br />
                You agree to use any communication features on the website, such
                as messaging or commenting, solely for the purposes intended and
                in compliance with applicable laws and regulations. You are
                prohibited from using other users' information obtained through
                the website for unauthorized purposes, such as sending
                unsolicited commercial messages (spam). Any misuse of
                communication features or unauthorized use of user information
                may result in termination of your access to the website.
                <br />
                <br />
                11. Responsibility for Business Listings, Reviews, and Other
                User-Contributed Content; Participation in Interactive Forums
                <br />
                PFD LLC may allow users to contribute content, such as business
                listings, reviews, or comments, to the website. You acknowledge
                and agree that you are solely responsible for any content you
                contribute and that PFD LLC does not endorse or guarantee the
                accuracy, integrity, or quality of such content. You further
                agree to participate in interactive forums, such as discussion
                boards or comment sections, in a respectful and lawful manner.
                <br />
                <br />
                12. Translations and Maps
                <br />
                Translations of the website content may be provided for
                convenience, but the English version of these Terms and
                Conditions shall prevail in case of any discrepancies. Maps and
                location-based information provided on the website are for
                informational purposes only and may not always be accurate or up
                to date.
                <br />
                <br />
                13. Notification of Infringement; DMCA Policy
                <br />
                If you believe that any content on the website infringes upon
                your copyright or other intellectual property rights, please
                contact us promptly with the necessary information as outlined
                in our Digital Millennium Copyright Act (DMCA) Policy.
                <br />
                <br />
                14. Unsolicited Ideas and Feedback
                <br />
                PFD LLC does not accept or consider unsolicited ideas or
                feedback regarding the website or its services. Any ideas,
                suggestions, or feedback you provide will be deemed
                non-confidential and non-proprietary, and PFD LLC shall have no
                obligations or liabilities with respect to such information.
                <br />
                <br />
                15. Links to Third-Party Sites
                <br />
                Our website may contain links to third-party websites that are
                not owned or controlled by PFD LLC. We are not responsible for
                the content, policies, or practices of any third-party websites.
                Your use of such websites is subject to the terms and conditions
                and privacy policies of those websites.
                <br />
                <br />
                16. Intellectual Property
                <br />
                All content on our website, including but not limited to text,
                graphics, logos, images, and software, is the property of PFD
                LLC or its licensors and is protected by intellectual property
                laws. You agree not to use, copy, modify, or distribute any
                content from our website without our prior written consent.
                <br />
                <br />
                17. Disclaimer of Warranties
                <br />
                Our website is provided on an "as is" and "as available" basis,
                without any warranties of any kind. We do not guarantee the
                accuracy, reliability, or completeness of any information on our
                website. Your use of our website is at your own risk.
                <br />
                <br />
                18. Limitation of Liability
                <br />
                In no event shall PFD LLC, its directors, officers, employees,
                or agents be liable for any direct, indirect, incidental,
                special, or consequential damages arising out of or in
                connection with your use of our website, even if advised of the
                possibility of such damages.
                <br />
                <br />
                19. Indemnification
                <br />
                You agree to indemnify and hold harmless PDF LLC, its directors,
                officers, employees, and agents from and against any and all
                claims, liabilities, damages, losses, costs, and expenses
                arising out of or in connection with your use of our website or
                any breach of these Terms and Conditions.
                <br />
                <br />
                20. Modifications
                <br />
                We reserve the right to modify or discontinue our website,
                services, or these Terms and Conditions at any time, without
                prior notice. Any changes will be effective immediately upon
                posting on our website. Your continued use of our website after
                any modifications constitutes your acceptance of the revised
                Terms and Conditions.
                <br />
                <br />
                21. Termination
                <br />
                PFD LLC reserves the right to terminate this agreement and your
                access to the website at its discretion, for any reason, without
                prior notice. Such termination may result in the removal of your
                user account and any associated data. You agree that PFD LLC
                shall not be liable to you or any third party for any
                termination of your access to the website.
                <br />
                <br />
                22. Governing Law and Jurisdiction
                <br />
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of the United States. Any disputes
                arising out of or in connection with these Terms and Conditions
                shall be subject to the exclusive jurisdiction of the federal
                and state courts located in Wyoming.
                <br />
                <br />
                23. Arbitration Clause
                <br />
                Any dispute, claim, or controversy arising out of or relating to
                these Terms and Conditions or the breach, termination,
                enforcement, interpretation, or validity thereof, including the
                determination of the scope or applicability of this agreement to
                arbitrate, shall be exclusively settled by arbitration
                administered by the American Arbitration Association (AAA) in
                accordance with its Commercial Arbitration Rules. The
                arbitration proceedings shall be conducted by a single
                arbitrator appointed by the AAA. The arbitration shall take
                place in a location chosen by PFD LLC. The arbitrator shall have
                the authority to award any remedy or relief that a court of
                competent jurisdiction could order or grant, including, without
                limitation, injunctive or other equitable relief. The prevailing
                party in any arbitration or court proceeding shall be entitled
                to recover its reasonable attorneys' fees and costs from the
                other party. By agreeing to this arbitration clause, both
                parties waive the right to bring or participate in any class
                action or representative action in court or in arbitration. The
                arbitration proceedings shall be conducted on an individual
                basis, and the arbitrator shall not consolidate more than one
                person's claims, unless agreed upon by all parties in writing.
                This arbitration clause is governed by the Federal Arbitration
                Act. Any arbitration award may be confirmed, enforced, and
                entered as a judgment in any court of competent jurisdiction. By
                using our website or services, you agree to this arbitration
                clause and waive any right to a trial by jury or to participate
                in a class action lawsuit.
                <br />
                <br />
                24. Severability
                <br />
                If any provision of these Terms and Conditions is found to be
                invalid or unenforceable, the remaining provisions shall remain
                in full force and effect.
                <br />
                <br />
                25. Privacy policy
                <br />
                By using this website you agree to it privacy policy which is on
                the website
                <br />
                <br />
                26. Entire Agreement
                <br />
                These Terms and Conditions constitute the entire agreement
                between you and PFD LLC regarding your use of our website and
                supersede any prior agreements or understandings, whether
                written or oral.
                <br />
                <br />
                27. Contact Information If you have any questions or concerns
                about these Terms and Conditions, please contact us at
                tandc@postfordollars.com.
                <br />
                <br />
                Effective date: 7-1- 23
              </p>
            </div>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={isChecked1}
                required
                onChange={handleCheckboxChange1}
              />
              <span className="checkmark"></span>
              You agree to all our sites privacy rules as well as our sites
              terms and conditions.
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
              You confirm that you are at least 18 years old
              {/* </Link> */}
            </label>
            <p className={styles.errors}>{messageError}</p>
            {/* <ReCAPTCHA
              sitekey="6LcBFlwmAAAAAJWblnjYhb4ftrng3BghULF6hy8I"
              onChange={handleCaptchaChange}
              // aria-required
            /> */}
                        <ReCAPTCHA
              sitekey={process.env.CAPTCHA_KEY}
              onChange={handleCaptchaChange}
              aria-required
            />
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
              <p className="nav_text">Screenshot of your social</p>
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
              <p className="nav_text">Screenshot of your social</p>
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
              <p className="nav_text">Screenshot of your social</p>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <>
                  <p className="nav_text">Don't have an account?</p>
                  <button className={`b_button`}>
                    <a href="https://accounts.google.com/signup." target="_blank" >
                      Sign up
                    </a>
                  </button>
                </>
              </div>
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
                href=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p className="nav_text">Don't have an account?</p>
                <button className={`b_button`}>
                  <a target="_blank"  href="https://www.yelp.com/signup?return_url=https%3A%2F%2Fwww.yelp.com%2F">
                    Sign up
                  </a>
                </button>
                {/* <button className={`b_button`}>Sign up</button> */}
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
                <p className="nav_text">Don't have an account?</p>
                <button className={`b_button`}>
                  <a  target="_blank"  href="https://www.yelp.com/signup?return_url=https%3A%2F%2Fwww.yelp.com%2F">
                    Sign up
                  </a>
                </button>
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

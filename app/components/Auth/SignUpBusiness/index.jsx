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
  async function sendDataToAPI(data) {
    const url = "/api/create-connection";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data sent to API successfully");
      } else {
        throw new Error("Failed to send data to API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const onSubmit1 = async (data) => {
    if (isCaptcha) {
      setMessageCaptcha(() => "Captcha is required!");
    } else {
      // event.preventDefault();
      setData(data);
      //createlink
      //   try {
      //     const response = await fetch('/api/create-stripe-user', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ id: "3131313131313131" }),
      //     });
      //     if (response.ok) {
      //       const responseData = await response.json();
      // console.log(responseData);
      //       console.log("yes")
      //     } else {
      //       console.error('Request failed');
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   }
      // const data2 = {
      //   email: 'test@example.com',
      //   country: 'US',
      // };

      // sendDataToAPI({data: data2});

      setTimeout(() => registerUser(), 500);
      // setTimeout(() => console.log(data), 500)
    }
  };
  const dispatch = useDispatch();

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
    },
    onError(error) {
      Swal.fire({
        icon: "error",
        title: `${error}`,
      });
    },

    onCompleted: async (data) => {
      Swal.fire({
        icon: "success",
        title: `Redirecting...`,
      });
      await router.push("/personal/business");
      // Dispatch the action to save user info
      await dispatch(setUserInfo(data.registerUser.user));
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
              <p style={{ textAlign: "center", fontWeight: "600" }}>
              Terms and Conditions - Businesses 
              </p>
              <p>
              Welcome to POSTFORDOLLAR.COM! These Terms and Conditions govern your use of our website as a client engaging in services provided by PFD LLC. Please read them carefully before using our website or engaging in any activities on it.
<br/><br/>
1. Acceptance of Terms<br/>
By accessing or using our website, you agree to be bound by these Terms and Conditions, including any additional terms and conditions and policies referenced herein. If you do not agree with any part of these Terms and Conditions, you should not use our website.
<br/><br/>
2. Description of Service<br/>
PFD LLC through POSTFORDOLLARS.com provides a platform that connects individuals ("Posters") who create social media posts with businesses ("Clients") that want to promote their products or services. Posters are compensated or rebated for their posts, which become the property of PFD LLC and can be used by the Clients.
<br/><br/>
3. Eligibility<br/>
By using our website as a client, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into binding contracts. If you are accessing or using our website on behalf of a company, organization, or other entity, you represent and warrant that you have authority to bind such entity to these Terms and Conditions.
<br/><br/>
4. User Accounts<br/>
To use certain features of our website, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to accept responsibility for all activities that occur under your account.
<br/><br/>
5. Payment and Compensation<br/>
Clients agree to pay PFD LLC 30% of the gross amount paid for the post for the creation and publication of social media posts by Posters if registered to pay via PayPal as friends and family (or other agreed upon direct no fee and irrevocable payment method) else it is 33% if we agree to be paid by credit card or regular PayPal.  The amounts paid for the post are determined ahead of time by the client based on the scope of the campaign and will be communicated to PDF LLC  before the campaign commences. The amounts listed to the Posters are a net amount (the amount you pay total minus our fees). A initial deposit might be required which if unused is fully refundable. Payment is made once a post is reviewed and approved. Client has 7 days to review and process (accept or reject) a post or payment for said post will be automatically deemed approved and payment processed. PFD LLC has the right to suspend the account for non payment or any other reason. PFD LLC may reinstate at its discretion the account if delinquent payments are paid. 
<br/><br/>
6. Ownership and Use of Posts<br/>
Once a Poster creates a social media post about the Client's business, the post becomes the property of PFD LLC. Clients are granted a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, distribute, and display the posts for promotional purposes related to their business once approved and paid for by Client. Clients may not sublicense or transfer this license to any third party without the express written consent of PFD LLC.
<br/><br/>
7. Prohibited Conduct<br/>
When using our website, you agree not to:
<br/><br/>
a. Violate any applicable laws, regulations, or third-party rights.<br/>
b. Use our website for any unauthorized or illegal purpose.<br/>
<br/>c. Engage in any activity that could damage, disable, or impair the operation or security of our website.
<br/>d. Use any automated system or software to access or interact with our website without our express written permission.
<br/>e. Share any content that is infringing, defamatory, obscene, sexually explicit or harmful.
<br/><br/>
8. Intellectual Property<br/>
All content on our website, including but not limited to text, graphics, logos, images, and software, is the property of PFD LLC or its licensors and is protected by intellectual property laws. You agree not to use, copy, modify, or distribute any content from our website without our prior written consent.
<br/><br/>
9. Disclaimer of Warranties<br/>
Our website is provided on an "as is" and "as available" basis, without any warranties of any kind. We do not guarantee the accuracy, reliability, or completeness of any information on our website. Your use of our website is at your own risk.
<br/><br/>
10. Limited License to Use the Website<br/>
Subject to your compliance with these Terms and Conditions, PFD LLC grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the website for its intended purposes. This license does not include any right to download, copy, modify, or distribute the content on the website, except as expressly authorized by PFD LLC. Your permission to use this website may be revoked at the sole discretion of PFD LLC at any time.  
<br/><br/>
11. Unauthorized Uses of the Site<br/>
You agree not to engage in any unauthorized use of the website, including but not limited to:
<br/><br/>
a. Accessing or attempting to access areas of the website that are not intended for public access.
<br/>b. Circumventing or disabling any security or authentication measures on the website.
<br/>c. Interfering with or disrupting the operation of the website or the servers hosting it.
<br/>d. Engaging in any activity that could impose an unreasonable burden on the infrastructure of the website.
<br/><br/>
12. Identity Verification<br/>
PFD LLC may require you to verify your identity in order to access certain features or services on the website. You agree to provide accurate and up-to-date information for identity verification purposes, and you acknowledge that PFD LLC may suspend or terminate your access if you fail to comply with these requirements.
<br/><br/>
13. Limitations on Communications and Use of Other Users' Information; No Spam<br/>
You agree to use any communication features on the website, such as messaging or commenting, solely for the purposes intended and in compliance with applicable laws and regulations. You are prohibited from using other users' information obtained through the website for unauthorized purposes, such as sending unsolicited commercial messages (spam). Any misuse of communication features or unauthorized use of user information may result in termination of your access to the website.
<br/><br/>
14. Responsibility for Business Listings, Reviews, and Other User-Contributed Content;<br/> Participation in Interactive Forums
PFD LLC may allow users to contribute content, such as business listings, reviews, or comments, to the website. You acknowledge and agree that you are solely responsible for any content you contribute and that PFD LLC does not endorse or guarantee the accuracy, integrity, or quality of such content. You further agree to participate in interactive forums, such as discussion boards or comment sections, in a respectful and lawful manner.
<br/><br/>
15. Translations and Maps<br/>
Translations of the website content may be provided for convenience, but the English version of these Terms and Conditions shall prevail in case of any discrepancies. Maps and location-based information provided on the website are for informational purposes only and may not always be accurate or up to date.
<br/><br/>
16. Notification of Infringement; DMCA Policy<br/>
If you believe that any content on the website infringes upon your copyright or other intellectual property rights, please contact us promptly with the necessary information as outlined in our Digital Millennium Copyright Act (DMCA) Policy.
<br/><br/>
17. Unsolicited Ideas and Feedback<br/>
PFD LLC does not accept or consider unsolicited ideas or feedback regarding the website or its services. Any ideas, suggestions, or feedback you provide will be deemed non-confidential and non-proprietary, and PFD LLC shall have no obligations or liabilities with respect to such information.
<br/><br/>
18. Links to Third-Party Sites<br/>
Our website may contain links to third-party websites that are not owned or controlled by PFD LLC. We are not responsible for the content, policies, or practices of any third-party websites. Your use of such websites is subject to the terms and conditions and privacy policies of those websites.
<br/>
19. Limitation of Liability<br/>
In no event shall PFD LLC, its directors, officers, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or any services provided, even if advised of the possibility of such damages.
<br/><br/>
20. Indemnification<br/><br/>
You agree to indemnify and hold harmless PFD LLC, its directors, officers, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses arising out of or in connection with your use of our website or any breach of these Terms and Conditions.
<br/><br/>
21. Modifications<br/>
We reserve the right to modify or discontinue our website, services, or these Terms and Conditions at any time, without prior notice. Any changes will be effective immediately upon posting on our website. Your continued use of our website after any modifications constitutes your acceptance of the revised Terms and Conditions.
<br/><br/>
22. Termination<br/>
PFD LLC reserves the right to terminate this agreement and your access to the website at its discretion, for any reason, without prior notice. Such termination may result in the removal of your user account and any associated data. You agree that PFD LLC shall not be liable to you or any third party for any termination of your access to the website.
<br/><br/>
23. Governing Law and Jurisdiction<br/>
These Terms and Conditions shall be governed by and construed in accordance with the laws of the United States. Any disputes arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the federal and state courts located in Wyoming USA.
<br/><br/>
24. Arbitration Clause<br/>
Any dispute, claim, or controversy arising out of or relating to these Terms and Conditions or the breach, termination, enforcement, interpretation, or validity thereof, including the determination of the scope or applicability of this agreement to arbitrate, shall be exclusively settled by arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. The arbitration proceedings shall be conducted by a single arbitrator appointed by the AAA. The arbitration shall take place in a location chosen by PFD LLC. The arbitrator shall have the authority to award any remedy or relief that a court of competent jurisdiction could order or grant, including, without limitation, injunctive or other equitable relief. The prevailing party in any arbitration or court proceeding shall be entitled to recover its reasonable attorneys' fees and costs from the other party. By agreeing to this arbitration clause, both parties waive the right to bring or participate in any class action or representative action in court or in arbitration. The arbitration proceedings shall be conducted on an individual basis, and the arbitrator shall not consolidate more than one person's claims, unless agreed upon by all parties in writing. This arbitration clause is governed by the Federal Arbitration Act. Any arbitration award may be confirmed, enforced, and entered as a judgment in any court of competent jurisdiction. By using our website or services, you agree to this arbitration clause and waive any right to a trial by jury or to participate in a class action lawsuit.
<br/><br/>
25. Severability<br/>
If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
<br/><br/>
26. Privacy policy. <br/>
By using this website you agree to its privacy policy which is listed on the website.
<br/><br/>
27. Entire Agreement<br/>
These Terms and Conditions constitute the entire agreement between you and PFD LLC regarding your use of our website and supersede any prior agreements or understandings, whether written or oral.
<br/><br/>
28. Contact Information
If you have any questions or concerns about these Terms and Conditions, please contact us at tandc@postfordollars.com.
<br/><br/>

Effective date: 7-1-23
              </p>
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
              You agree to all our sites privacy rules as well as our sites
              terms and conditions.
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
              You confirm that you are at least 18 years old
              {/* </Link> */}
            </label>
            <p className={styles.errors}>{messageError}</p>
            <ReCAPTCHA
                  sitekey={process.env.CAPTCHA_KEY}
              onChange={handleCaptchaChange}
              aria-required
            />
            
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

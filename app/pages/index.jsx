import React from 'react'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HomeCom from '../components/Home'
import Head from 'next/head'
// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["home"]))
//     }
//   }
// }

export default function Hello() {
  return (
  <>
   <Head>
        <title>Expat Path - Your Passport to a Global Lifestyle</title>
        <meta name="description" content="At Expat Path we believe in empowering our clients with the knowledge and resources they need to confidently embrace their global adventures. Whether you're moving abroad for the first time or transitioning to a digital nomad lifestyle, we're dedicated to making your journey smoother and more enjoyable." />
      </Head>
  <HomeCom />
  </>
  )
}

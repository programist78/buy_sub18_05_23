import React from "react";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HomeCom from "../components/Home";
import Head from "next/head";
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
        <title>Postfordollars - Achieve more with us!</title>
        <meta
          name="description"
          content="Welcome to PostForDollars - the ultimate platform that connects posters and businesses for mutually beneficial collaborations! Whether you're a business looking to promote your products or services or a poster seeking opportunities to earn rewards, PostForDollars is here to help."
        />
      </Head>
      <HomeCom />
    </>
  );
}

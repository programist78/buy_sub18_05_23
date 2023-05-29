import '../styles/globals.scss'
import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache.js";
import { ApolloClient } from "@apollo/client/core/ApolloClient.js";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider.js";
import { createUploadLink } from "apollo-upload-client";
import Head from 'next/head'
import Layout from "../components/Layout.jsx";
import { AuthProvider } from "../hooks/AuthContext.jsx";
import {  useState, useEffect } from "react";
import { useRouter } from "next/router.js";
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux';
import NProgress from 'nprogress'
import Router from 'next/router'
import store from '../redux/store.jsx';
import { ChakraProvider } from "@chakra-ui/react"

// import Loading from '../components/Loading'
import { ApolloCache } from '@apollo/client/core';
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());
import '../styles/Nprogress.scss';
const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: process.env.API_URI,
    credentials: 'include'
  }),
  });
export const apolloClient = createApolloClient(ApolloCache)

const App = ({
  Component,
  pageProps
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, []);
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;}
  return (
    <Provider store={store}>
  <AuthProvider>
  <ApolloProvider client={apolloClient}>
    {/* {
        loading ?<Loading />
        : */}
      <Layout>
        <Head>
        </Head>
        <main>
        <>
     <ChakraProvider>
        <Component {...pageProps} />
        </ChakraProvider>
        </>
        </main>
      </Layout>
       {/* } */}
  </ApolloProvider>
  </AuthProvider>
  </Provider>
  )
}

// export default appWithTranslation(App);
export default App
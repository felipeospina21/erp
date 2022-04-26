import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
// import { ProductsProvider } from "../context/ProductsContext";
import Layout from "../components/Layout/Layout";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
  
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
   
    </Provider>
  );
}

export default MyApp;

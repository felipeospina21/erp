import { ChakraProvider } from "@chakra-ui/react";
import { ProductsProvider } from "../context/productsContext";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ProductsProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ProductsProvider>
  );
}

export default MyApp;

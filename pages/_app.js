import { ChakraProvider } from "@chakra-ui/react";
import { ProductsProvider } from "../context/ProductsContext";
import Layout from "../components/Layout/Layout";
import { store } from "../app/store";
import { Provider } from "react-redux";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ProductsProvider>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ProductsProvider>
    </Provider>
  );
}

export default MyApp;

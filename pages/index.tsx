import React from "react";
import CardsContainer from "../components/ProductsCard/CardsContainer";
import { useGetProductsQuery } from "../redux/services";

export default function Home(): JSX.Element {
  const { data:products } = useGetProductsQuery()
  return (
    <div>
      <h1>Products</h1>
      <CardsContainer data={products}/>
      {/* <FormikTest/> */}
    </div>
  );
}

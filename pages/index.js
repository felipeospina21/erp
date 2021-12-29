import React from "react";
import FormikTest from "../components/FormikTest";
import CardsContainer from "../components/ProductsCard/CardsContainer";

export default function Home() {
  return (
    <div>
      <CardsContainer />
      <FormikTest/>
    </div>
  );
}

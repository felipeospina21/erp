import React, { useState } from "react";
import { Tr, Td, Select } from "@chakra-ui/react";

const TableRow = ({  products }) => {
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleChange = event => {
    let prodIndex = products
      .map(product => {
        return product.name;
      })
      .indexOf(event.target.value);
    setPrice(products[prodIndex].price);
    setStock(products[prodIndex].quantity);
  };
  return (
    <Tr>
      <Td>
        <Select placeholder='Select option' onChange={handleChange}>
          {products.map(product => {
            return <option value={product.name}>{product.name}</option>;
          })}
        </Select>
      </Td>
      <Td isNumeric>{price}</Td>
      <Td isNumeric>{stock}</Td>
    </Tr>
  );
};

export default TableRow;

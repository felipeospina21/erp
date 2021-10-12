import React from "react";
import { Button } from "@chakra-ui/react";
import { BsMinusCircle } from "react-icons/bs";

const RowDeleteBtn = () => {
  const deleteRow = params => {
    console.log("row deleted");
    console.log(params);
  };

  return (
    <div>
      <Button leftIcon={<BsMinusCircle />} onClick={() => deleteRow(params)} />
    </div>
  );
};

export default RowDeleteBtn;

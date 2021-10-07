import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import GridContainer from "../components/GridContainer";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ventas = () => {
  const salesHeader = [
    "producto",
    "cantidad",
    "descuento",
    "precio bruto",
    "precio neto",
  ];

  const [rowData, setRowData] = useState([
    {
      producto: null,
      cantidad: null,
      descuento: null,
      "precio bruto": null,
      "precio neto": null,
    },
  ]);
  const [data, setData] = useState([{}]);

  function numberParser(params) {
    return Number(params.newValue);
  }

  const onCellValueChanged = event => {
    setRowData([
      {
        producto: event.data.producto,
        cantidad: event.data.cantidad,
        descuento: event.data.descuento,
        "precio bruto": event.data.cantidad * 20000,
        "precio neto": event.data["precio bruto"] * (1 - event.data.descuento),
      },
    ]);
  };

  const onClick = () => {
    const prevRowData = [ ...rowData]
    console.log(prevRowData)
    console.log(rowData, 'rowdata')
    setData([
      ...prevRowData,
      {
        producto: null,
        cantidad: null,
        descuento: null,
        "precio bruto": null,
        "precio neto": null,
      },
    ]);
  };

  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: 1200 }}>
      <AgGridReact rowData={data} onCellValueChanged={onCellValueChanged}>
        <AgGridColumn editable={true} sortable={true} field='producto'></AgGridColumn>
        <AgGridColumn
          valueParser={numberParser}
          editable={true}
          sortable={true}
          field='cantidad'></AgGridColumn>
        <AgGridColumn
          valueParser={numberParser}
          editable={true}
          sortable={true}
          field='descuento'></AgGridColumn>
        <AgGridColumn sortable={true} field='precio bruto'></AgGridColumn>
        <AgGridColumn sortable={true} field='precio neto'></AgGridColumn>
      </AgGridReact>
      <button onClick={onClick}>click</button>
    </div>
  );
};

export default ventas;

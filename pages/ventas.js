import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import GridContainer from "../components/GridContainer";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ventas = () => {

  const [data, setData] = useState([{}]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    params.api.sizeColumnsToFit();
  };

  function numberParser(params) {
    return Number(params.newValue);
  }

  function createNewRowData() {
    const newData = {};
    return newData;
  }
  const addRow = () => {
    const newItems = [createNewRowData()];
    const res = gridApi.applyTransaction({
      add: newItems,
      // addIndex: addIndex,
    });
  };

  // Value Getters
  const brutePrice = (params) => {
    const brutePrice = params.data.cantidad * 20000
    return params.data.brutePrice = brutePrice
  }

  const netPrice = (params) =>{
    const netPrice = params.data.brutePrice * (1 - params.data.descuento)
    return  params.data.netPrice = netPrice
  }


  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: 1200 }}>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={data}
        >
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
        <AgGridColumn sortable={true} valueGetter={brutePrice} field='precio bruto'></AgGridColumn>
        <AgGridColumn sortable={true} valueGetter={netPrice} field='precio neto'></AgGridColumn>
      </AgGridReact>
      <button onClick={() => addRow()}>click</button>
    </div>
  );
};

export default ventas;

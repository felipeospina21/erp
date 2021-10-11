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
  const price = params => {
    const price = params.data.cantidad * 20000;
    return (params.data.price = price);
  };

  const total = params => {
    const total = params.data.price * (1 - params.data.descuento);
    return (params.data.total = total);
  };

  //TODO: style button
  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: 1200 }}>
      <AgGridReact onGridReady={onGridReady} rowData={data}>
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
        <AgGridColumn
          sortable={true}
          valueGetter={price}
          field='precio'></AgGridColumn>
        <AgGridColumn
          sortable={true}
          valueGetter={total}
          field='total'></AgGridColumn>
      </AgGridReact>
      <button onClick={() => addRow()}>click</button>
    </div>
  );
};

export default ventas;

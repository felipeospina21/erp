import React, { useState } from "react";
import { Button, Box, Input } from "@chakra-ui/react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { BsPlusCircle } from "react-icons/bs";
import { thousandSeparator } from "../utils";
import ValueContainer from "../components/ValueContainer";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import TaxPicker from "../components/TaxPicker";

const ventas = () => {
  const [data, setData] = useState([{}]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

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

  const onChange = event => {
    if (event.oldValue === undefined) {
      setData([...data, {}]);
    }
    let newTotal = 0;
    data.forEach(item => {
      newTotal = newTotal + item.total;
    });
    setTotal(newTotal);
  };

  // Value Getters
  const priceGetter = params => {
    if (isNaN(params.data.cantidad)) {
      const price = 0;
      return (params.data.price = price);
    } else {
      const price = params.data.cantidad * 20000;
      params.data.price = price;
      params.data.strprice = thousandSeparator(price, 0);
      return params.data.strprice;
    }
  };

  const totalGetter = params => {
    if (isNaN(params.data.descuento) || isNaN(params.data.price)) {
      const total = 0;
      return (params.data.total = total);
    } else {
      const total = params.data.price * (1 - params.data.descuento);
      params.data.total = total;
      params.data.strTotal = thousandSeparator(total, 0);
      return params.data.strTotal;
    }
  };

  return (
    <Box>
      <Input placeholder='Nombre Proveedor' size='lg' />
      <div className='ag-theme-alpine' style={{ height: 400, width: "100%" }}>
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
            onCellValueChanged={onChange}
            field='descuento'></AgGridColumn>
          <AgGridColumn
            sortable={true}
            valueGetter={priceGetter}
            field='precio'></AgGridColumn>
          <AgGridColumn
            sortable={true}
            valueGetter={totalGetter}
            field='total'></AgGridColumn>
        </AgGridReact>
        <Button m='1rem' leftIcon={<BsPlusCircle />} onClick={() => addRow()}>
          Agregar Fila
        </Button>
        <Box float='right' justifyItems='right' m='1rem 1rem 1rem auto'>
          <ValueContainer text='Subtotal: ' value={total} />
          <TaxPicker value={tax} setTax={setTax} />
          <ValueContainer text='Total: ' value={total * (1 + tax / 100)} />
        </Box>
      </div>
    </Box>
  );
};

export default ventas;

import React, { useState, useContext, useEffect } from "react";
import { Button, Box, Input } from "@chakra-ui/react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { BsPlusCircle } from "react-icons/bs";
import { thousandSeparator } from "../utils";
import { ProductsContext } from "../context/productsContext";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebase/clientApp";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ventas = () => {
  const [data, setData] = useState([{ id: 0 }]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [products, setProducts] = useContext(ProductsContext);

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

  const addRow = () => {
    setData([...data, { id: data.length }]);
  };

  const deleteRow = params => {
    const newData = data.filter(element => element.id !== params.rowIndex);
    setData(newData);
  };

  const onChange = event => {
    if (event.oldValue === undefined) {
      const newData = [...data];
      newData[event.data.id] = event.data;
      setData(newData);
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
      params.data.id = params.node.rowIndex;
      params.data.total = total;
      params.data.strTotal = thousandSeparator(total, 0);
      return params.data.strTotal;
    }
  };

  const getProducts = db => {
    const prodsColl = collection(db, "productos");
    getDocs(prodsColl)
      .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      .then(prods => setProducts(prods));
  };

  useEffect(() => getProducts(db), []);

  //TODO: get cliente input value
  return (
    <Box>
      <Input placeholder='Nombre Cliente' size='lg' m='1rem auto' />
      <div className='ag-theme-alpine' style={{ height: 400, width: "100%" }}>
        <AgGridReact onGridReady={onGridReady} rowData={data}>
          <AgGridColumn
            field='producto'
            cellEditor='agRichSelectCellEditor'
            cellEditorParams={{ values: ["Ireland", "USA"] }}
            // sortable={true}
            ></AgGridColumn>
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
          <AgGridColumn
            cellRendererFramework={params => (
              <div>
                <button onClick={() => deleteRow(params)}>Eliminar</button>
              </div>
            )}
            field='acción'></AgGridColumn>
        </AgGridReact>
        <Button m='1rem' leftIcon={<BsPlusCircle />} onClick={() => addRow()}>
          Agregar Fila
        </Button>
        <Box float='right' justifyItems='right' m='1rem 5rem 1rem auto'>
          <ValueContainer text='Subtotal: ' value={total} />
          <TaxPicker value={tax} setTax={setTax} />
          <ValueContainer text='Total: ' value={total * (1 + tax / 100)} />
        </Box>
      </div>
    </Box>
  );
};

export default ventas;

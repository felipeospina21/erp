import React, { useState, createContext } from 'react';

export const TableStylesContext = createContext();

export const TableStylesProvider = (props) => {
  const [cellStyles, setCellStyles] = useState({
    textAlign: 'center',
    border: '1px solid black',
  });

  return (
    <TableStylesContext.Provider value={[cellStyles, setCellStyles]}>
      {props.children}
    </TableStylesContext.Provider>
  );
};

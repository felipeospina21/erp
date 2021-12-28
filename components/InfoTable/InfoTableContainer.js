import React from "react";
import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";
import ClientsRow from "./ClientsRow";

const InfoTableContainer = props => {
  return (
    <Box overflow='auto' mb='1rem'>
      <Table variant='simple' maxW='1300px' m={["auto"]} size={["sm", "md"]}>
        <Thead fontSize={["sm", "md"]}>
          <Tr>
            {props.headerList.map(header => {
              return <Th key={header.fieldName}>{header.title}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody fontSize={["sm", "md"]}>
          {props.data.map(dataRow => {
            return <ClientsRow key={dataRow.id} data={dataRow} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InfoTableContainer;

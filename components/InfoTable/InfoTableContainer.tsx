import React from "react";
import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";
import ClientsRow from "./ClientsRow";
import { NewClientResponse } from "../../redux/services";

export interface InfoTableContainerProps {
  headerList: {
    name:string;
    label:string;
  }[];
  data: NewClientResponse[] | [];
};
const InfoTableContainer = ({headerList, data}:InfoTableContainerProps): JSX.Element => {
  return (
    <Box overflow='auto' mb='1rem'>
      <Table variant='simple' maxW='1300px' m={["auto"]}>
        <Thead fontSize={["sm", "md"]}>
          <Tr>
            {headerList.map((header) => {
              return <Th key={header.name}>{header.label}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody fontSize={["sm", "md"]}>
          {data?.map((dataRow) => {
            return <ClientsRow key={dataRow._id} client={dataRow} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InfoTableContainer;

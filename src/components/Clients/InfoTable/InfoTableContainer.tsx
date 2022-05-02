import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Box } from '@chakra-ui/react';
import ClientRow from './ClientRow/ClientRow';
import { Client } from '@/redux/services';
import { clientFields } from '../ClientForm/fields/clientFields';
export interface InfoTableContainerProps {
  data: Client[] | [];
}
export function InfoTableContainer({ data }: InfoTableContainerProps): JSX.Element {
  return (
    <Box overflow="auto" mb="1rem">
      <Table variant="simple" maxW="1300px" m={['auto']}>
        <Thead fontSize={['sm', 'md']}>
          <Tr>
            {clientFields.map((header) => {
              return <Th key={header.name}>{header.label}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody fontSize={['sm', 'md']}>
          {data?.map((dataRow) => {
            return <ClientRow key={dataRow._id} client={dataRow} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default InfoTableContainer;

import {
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  TableContainer as TableWrapper,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { TableCellHeader, TableRow } from './';
import { useAppDispatch } from '@/redux/hooks';
import {
  addProductToList,
  Delivery,
  removeDeliveryFromList,
  removeProductFromList,
} from '@/redux/slices/salesSlice';
import { nanoid } from '@reduxjs/toolkit';
import { SaleSummary } from './Footer';
import { CloseButton } from '@/components/Shared';

export interface TableContainerProps {
  pageMaxW: string;
  header: {
    title: string;
    id: string;
  }[];
  deliveryId: number;
  deliveryData: Delivery;
  salesBtnDisabled: boolean;
  setSalesBtnDisabled: (salesBtnDisabled: boolean) => void;
}

export function TableContainer({
  pageMaxW,
  header,
  deliveryId,
  deliveryData: { productsList },
  salesBtnDisabled,
  setSalesBtnDisabled,
}: TableContainerProps): JSX.Element {
  const dispatch = useAppDispatch();

  const addRow = (): void => {
    salesBtnDisabled ? null : setSalesBtnDisabled(true);
    const newRow = {
      rowId: nanoid(),
      rowTotal: 0,
      item: '',
      price: 0,
      stock: 0,
      quantity: 0,
      discount: 0,
      productId: '',
    };

    dispatch(addProductToList({ deliveryId, rowData: newRow }));
  };

  const removeRow = (id: string): void => {
    const idx = productsList.findIndex(({ rowId }) => id === rowId);
    dispatch(removeProductFromList({ deliveryId, idx }));
  };

  function deletePartialSale(idx: number): void {
    dispatch(removeDeliveryFromList(idx));
  }

  return (
    <Flex
      flexDir="column"
      align="flex-start"
      m={['2rem 2rem', null, null, null, null, '2rem auto']}
      w={[null, null, null, null, null, '100%']}
      maxW={pageMaxW}
      overflow="auto"
      bgColor="brand.bgLight"
      borderRadius="3xl"
      boxShadow={'var(--boxShadow)'}
    >
      <Flex m="0.5rem 1.5rem" align="center" justify="space-between" w="95%">
        <Heading as="h2" size="sm" w="10rem">{`Entrega ${deliveryId + 1}`}</Heading>
        <CloseButton
          size="md"
          onClick={(): void => {
            deletePartialSale(deliveryId);
          }}
        />
      </Flex>

      <TableWrapper p="2rem 0" w="100%" display="flex" justifyContent="center">
        <Table variant="simple" w="90%" m={['auto']} colorScheme="blackAlpha">
          <Thead fontSize={['sm', 'md']}>
            <Tr>
              {header.map(({ title, id }) => {
                return <TableCellHeader key={id}>{title}</TableCellHeader>;
              })}
            </Tr>
          </Thead>
          <Tbody fontSize={['xs', 'sm']}>
            {productsList.map(({ rowId }) => {
              return (
                <TableRow
                  key={rowId}
                  id={rowId ?? nanoid()}
                  deliveryId={deliveryId}
                  removeRow={removeRow}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableWrapper>
      <Button
        variant="ghost"
        color="brand.green.600"
        size="sm"
        mt="0"
        mb="1rem"
        ml={[null, '1rem', '2rem', '4rem']}
        leftIcon={<Icon as={FaPlusCircle} />}
        onClick={addRow}
      >
        Row
      </Button>
      <SaleSummary pageMaxW={'var(--maxPageWitdth)'} deliveryId={deliveryId} />
    </Flex>
  );
}

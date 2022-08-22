import React, { CSSProperties, ReactElement, useState } from 'react';
import { Layout } from '@/components/Shared';
import { Box, Flex, HStack } from '@chakra-ui/react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SaleResponse } from '@/redux/services';

export default function CostosPage(): JSX.Element {
  const statuses = [
    '',
    'produccion',
    'alistamiento',
    'despacho',
    'entregado',
    'facturado',
    'pagado',
  ];
  const ventas = [
    { _id: '1', status: 'alistamiento' },
    { _id: '2', status: 'entregado' },
  ];

  return (
    <Box overflow={'auto'} fontSize="0.85rem">
      <HStack>
        {statuses.map((status) => (
          <Flex key={status} w="auto" minW="100px" justify="center">
            {status}
          </Flex>
        ))}
      </HStack>

      {ventas.map((venta) => {
        return <SaleStatusRow key={venta._id} venta={venta} statuses={statuses} />;
      })}
    </Box>
  );
}

CostosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>{page}</Layout>
    </DndProvider>
  );
};

function SaleStatusRow({
  statuses,
  venta,
}: {
  statuses: string[];
  venta: Partial<SaleResponse>;
}): JSX.Element {
  const [currStatus, setCurrStatus] = useState(venta.status);
  return (
    <HStack mt="1rem" spacing={0}>
      {statuses.map((status, idx) => {
        return currStatus === status ? (
          <SaleStatusMarker key={idx} status={status} setMarker={setCurrStatus} />
        ) : (
          <SaleStatusReceiver
            key={idx}
            status={status}
            statusIdx={idx}
            currStatusIdx={statuses.indexOf(currStatus ?? '')}
          />
        );
      })}
    </HStack>
  );
}

function SaleStatusMarker({
  status,
  setMarker,
}: {
  status: string;
  setMarker: React.Dispatch<React.SetStateAction<string | undefined>>;
}): JSX.Element {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOX',
    item: { status },
    end: (item, monitor): void => {
      const dropResult = monitor.getDropResult<{ status: string }>();

      if (item && dropResult) {
        setMarker(dropResult.status);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Flex ref={drag} style={{ ...style, opacity }} w="auto" minW="108px" justify="center">
      *
    </Flex>
  );
}

function SaleStatusReceiver({
  status,
  currStatusIdx,
  statusIdx,
}: {
  status: string | undefined;
  statusIdx: number;
  currStatusIdx: number;
}): JSX.Element {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: () => ({ status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  let backgroundColor = 'white';
  if (currStatusIdx > statusIdx) {
    backgroundColor = 'green';
  }

  const isActive = canDrop && isOver;
  if (isActive) {
    backgroundColor = 'black';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (
    <Box ref={drop} style={{ ...style, backgroundColor }} w="auto" minW="108px" color="transparent">
      {'n'}
    </Box>
  );
}

const style: CSSProperties = {
  // border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  // marginRight: '1.5rem',
  // marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

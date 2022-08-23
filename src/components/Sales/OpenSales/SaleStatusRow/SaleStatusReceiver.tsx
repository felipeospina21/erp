import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDrop } from 'react-dnd';
import { style } from './style';

interface SaleStatusReceiverProps {
  status: string | undefined;
  statusIdx: number;
  currStatusIdx: number;
}

export function SaleStatusReceiver({
  status,
  currStatusIdx,
  statusIdx,
}: SaleStatusReceiverProps): JSX.Element {
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

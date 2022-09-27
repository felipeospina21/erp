import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDrop } from 'react-dnd';
import { style } from './style';

interface StatusCellProps {
  status: string | undefined;
  statusIdx: number;
  currStatusIdx: number;
}

export function StatusCell({ status, currStatusIdx, statusIdx }: StatusCellProps): JSX.Element {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: () => ({ status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  let backgroundColor = 'brand.bg_100';
  if (currStatusIdx > statusIdx) {
    backgroundColor = 'brand.teal';
  }

  const isActive = canDrop && isOver;
  if (isActive) {
    backgroundColor = 'custom.grey.700';
  } else if (canDrop) {
    backgroundColor = 'custom.green.100';
  }
  return (
    <Box ref={drop} sx={{ ...style, backgroundColor }} color="transparent">
      {''}
    </Box>
  );
}

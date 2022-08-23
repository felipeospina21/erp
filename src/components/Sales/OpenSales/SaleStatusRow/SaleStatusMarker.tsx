import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useDrag } from 'react-dnd';
import { style } from './style';

interface SaleSatusMarkerProps {
  status: string;
  setMarker: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function SaleStatusMarker({ status, setMarker }: SaleSatusMarkerProps): JSX.Element {
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

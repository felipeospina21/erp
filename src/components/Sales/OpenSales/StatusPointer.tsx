import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useDrag } from 'react-dnd';
import { style } from './style';

interface SatusPointerProps {
  status: string;
  setMarker: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function StatusPointer({ status, setMarker }: SatusPointerProps): JSX.Element {
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
    <Flex
      ref={drag}
      sx={{
        ...markerCSS.style,
        opacity,
      }}
      justify="center"
    >
      <Box bgColor="brand.teal" w="30px" h="30px" borderRadius="50%" />
    </Flex>
  );
}

const markerCSS = {
  style: {
    ...style,
    backgroundColor: 'brand.bg',
    position: 'relative',
    padding: 0,
    borderRight: 'none',
  },
};

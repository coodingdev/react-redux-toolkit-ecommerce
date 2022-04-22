import React from 'react'
import { Box, Spinner } from "@chakra-ui/react";

export const Spinnerr = () => {
  return (
    <Box display='flex' alignItems='center' mt='150px' mx='auto' justifyContent='center'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='seagreen'
        size='xl'
      />
    </Box>
  );
}

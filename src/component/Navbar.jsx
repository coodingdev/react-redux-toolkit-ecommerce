
import { Badge, Box, Text } from '@chakra-ui/react'
import { Icon } from "@chakra-ui/react";
import { BsFillCartFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux'
import { toggleModal } from '../redux/cartSlice';
import { Cart } from './Cart';

export const Navbar = () => {
    const dispatch = useDispatch()

    //local storage
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    return (
      <>
        <Box
          bg='seagreen'
          color='white'
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
          position='fixed'
          top='0'
          zIndex={9999}
          p={4}
        >
          <Text
            fontWeight='bold'
            fontSize='3xl'
            cursor='pointer'
          >
            curlyBrace
          </Text>
          <Box
            onClick={() =>
              toggleModal() ? dispatch(toggleModal()) : undefined
            }
            position='relative'
            cursor='pointer'
          >
            <Icon h={8} w={8} as={BsFillCartFill} />
            {cartItems?.length > 0 ? (
              <Badge
                borderRadius='md'
                position='absolute'
                top='0.1rem'
                left='0.8rem'
                colorScheme='green'
              >
                {cartItems.length}
              </Badge>
            ) : null}
          </Box>
        </Box>
        <Cart />
      </>
    );
}

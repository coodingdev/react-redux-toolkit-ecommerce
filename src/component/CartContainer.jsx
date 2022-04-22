import { CartItem } from "./CartItem";
import { useSelector } from 'react-redux';
import { Center, Container, SimpleGrid, Text } from "@chakra-ui/react";
import './CartContainer.css';


export const CartContainer = () => {
    const {cartItems} = useSelector((store) => store.cart);
  return (
    <Container pt='7rem' maxW={"5xl"}>
      <Center><Text fontSize='2xl' fontWeight='bold' mb={4}>Products</Text></Center>
      <SimpleGrid mx={{sm: 'auto'}} columns={[2, 2, 3]} spacing={2} >
        {cartItems?.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

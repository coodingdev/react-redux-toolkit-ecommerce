import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Tooltip,
  Button,
  Box,
  Image,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { currencyFormate } from "../hook/currencyFormate";
import {
  removeItemFromCart,
  closeModal,
  decreaseQuantity,
  increaseQuantity,
} from "../redux/cartSlice";
import { CloseIcon } from '@chakra-ui/icons';


export const Cart = () => {
  const { modalIsOpening, total } = useSelector(store => store.cart);
const dispatch = useDispatch();
  
//get data from localStorage
const dataFromLocalStorage = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  return cartItems;
};
let cartItems = dataFromLocalStorage();


  return (
    <Box>
      <Drawer
        closeOnOverlayClick={true}
        isOpen={modalIsOpening}
        placement='right'
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent mt='4rem'>
          <DrawerHeader>
            Shopping cart
            <Button
              size='sm'
              float='right'
              onClick={() => dispatch(closeModal())}
            >
              <CloseIcon />
            </Button>
          </DrawerHeader>

          <DrawerBody>
            {cartItems?.length > 0 ? (
              cartItems.map(item => (
                <Box
                  key={item.id}
                  border='1px'
                  borderColor='gray.200'
                  mb={3}
                  p={2}
                  boxShadow='0px 0px 10px rgba(0, 0, 0, 0.1)'
                >
                  <Box mb={2} display='flex' justifyContent='space-between'>
                    <Box display='flex'>
                      <Image
                        border='1px solid #e5e7eb'
                        objectFit='cover'
                        objectPosition='center'
                        borderRadius='0.375rem'
                        p={2}
                        w='94px'
                        h='94px'
                        src={item.image}
                      />
                      <Text ml={4}>{item.title}</Text>
                    </Box>
                    <Box>{currencyFormate(item.price)}</Box>
                  </Box>
                  <hr />
                  <Box
                    mt={2}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Badge>{item.quantity}</Badge>
                    <Box>
                      <Button
                        _focus={{ outline: "none" }}
                        mr={2}
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </Button>
                      <Button
                        _focus={{ outline: "none" }}
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </Button>
                    </Box>
                    <Button
                      bg={0}
                      _hover={{ color: "red", bg: "none" }}
                      ml={2}
                      onClick={() =>
                        dispatch(
                          removeItemFromCart({ id: item.id, title: item.title })
                        )
                      }
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Text>No item in the cart</Text>
            )}
          </DrawerBody>
          <hr />
          <DrawerFooter display='flex' flexDirection='column' w='100%'>
            <Box display='flex'>
              <Box>
                <Text fontSize='16px' fontWeight='bold'>
                  Subtotal
                </Text>
                <Text fontSize='16px' color='gray.500'>
                  Shipping and taxes calculated at checkout.
                </Text>
              </Box>
              <Text fontSize='16px' fontWeight='bold'>
                {`${currencyFormate(total.toFixed(2))}`}
              </Text>
            </Box>
            <Box mt={5}>
              <Button
                display='flex'
                justifyContent='center'
                w='100%'
                _hover={{ bg: "seagreen.500", opacity: "0.5" }}
                bg='seagreen'
                color='white'
                onClick={false}
                isDisabled={
                  cartItems?.length === 0 && (
                    <Tooltip label='No item in the cart' />
                  )
                }
              >
                Checkout
              </Button>
              or
              <Button
                bg={0}
                color='seagreen'
                _focus={{ border: "none", bg: "none" }}
                _hover={{ bg: "none" }}
                mb={2}
              >
                Continue Shopping
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

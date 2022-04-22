import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { currencyFormate } from "./../hook/currencyFormate";
import { Spinnerr } from "./Spinner";
import { StarIcon, ArrowBackIcon } from "@chakra-ui/icons";

export const ProductDetailPage = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  let { productId } = useParams();
  const getProductDtail = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  useEffect(() => {
    getProductDtail();
  }, [getProductDtail]);

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };


  const { title, price, image, description, rating } = product;
  if (loading) {
    return <Spinnerr />;
  }
  return (
    <>
      <Container maxW={"5xl"}>
        <Button mt='5rem' zIndex='3333' pos='fixed' onClick={navigateBack}>
          <ArrowBackIcon />
        </Button>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={image}
              mt='5rem'
              mx={{ base: "auto", md: 0 }}
              w={{ base: "100%", md: "50%", lg: "100%", xl: "100%", xs: "100%" }}
              h='350px'
              boxShadow='0px 0px 10px rgba(0, 0, 0, 0.1)'
              
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "lg", sm: "4xl", lg: "5xl" }}
                alignContent={"center"}
              >
                {title}
              </Heading>
              <Text color='gray.900' mt={2} fontWeight={300} fontSize={"lg"}>
                {currencyFormate(price)}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<StackDivider />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"lg"} fontWeight={"300"}>
                  {description}
                </Text>
                <Box>
                  <Text fontSize={"lg"} fontWeight={"300"}>
                    {rating.count} Reviews
                  </Text>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < rating.rate ? "yellow.300" : "gray.300"}
                      />
                    ))}
                </Box>
              </VStack>
              </Stack>

            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              _active={{
                transform: "translateY(4px)",
                boxShadow: "lg",
              }}
              color='white'
              bg='seagreen'
              // onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent={"center"}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
};

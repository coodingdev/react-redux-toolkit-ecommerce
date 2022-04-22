import { Box, Image, Badge, Button, Flex, Spacer, Tooltip } from "@chakra-ui/react";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import {BsFillCartPlusFill} from "react-icons/bs";
import { addItemToCart } from "../redux/cartSlice";
//currencyFormatter
import { currencyFormate } from './../hook/currencyFormate';
import { useDispatch } from "react-redux";

export const CartItem = ({id, title, price, image, category, rating}) => {
const dispatch = useDispatch()

 

  return (
    <>
      <Box
        bg='white'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        w='100%'
        cursor='pointer'
      >
        <Link to={`/product/${id}`}>
          <Image
            w={"100%"}
            h={{ base: "200px", sm:'98px', md: "300px" }}
            objectFit='center'
            p={4}
            m={2}
            backgroundSize='cover'
            src={image}
            alt={title}
          />
        </Link>
        <Box p='2'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {category}
            </Box>
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {title}
          </Box>

          <Box as='span' color='gray.600' fontSize='md' fontWeight='bold'>
            {currencyFormate(price)}
          </Box>
          <Flex mt='2' alignItems='center'>
            <Box>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < rating.rate ? "green.300" : "gray.300"}
                  />
                ))}
            </Box>
            <Spacer />
            <Box color='gray.600'>
              <ViewIcon fontSize='2xl' /> {rating.count}
            </Box>
          </Flex>
        </Box>
        <Tooltip hasArrow label='Add To Cart' placement='top'>
          <Button
            m={2}
            float='right'
          onClick={() => dispatch(addItemToCart({id, title, price, image}))}
          >
            <Icon as={BsFillCartPlusFill} size='20px' />
          </Button>
        </Tooltip>
      </Box>
    </>
  );
}

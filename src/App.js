
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal, getCart } from "./redux/cartSlice";
import { useEffect } from "react";
import { Navbar } from "./component/Navbar";
import { Box } from "@chakra-ui/react";
import { Spinnerr } from './component/Spinner';
import { Home } from './component/Home';

function App() {
  const { isLoading, addedItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();

   useEffect(() => {
     dispatch(calculateTotal());
   }, [addedItems, dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Spinnerr />
    );
  }

  return (
    <Box className="App">
      <Navbar />
      <Home />
    </Box>
  );
}

export default App;

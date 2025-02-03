import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  /* const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const { addProductToCart } = useContext(cartContext);

async function getProducts() {
  try {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching products:", error);
    setIsLoading(false);
  }
}

useEffect(() => {
  getProducts();
}, []); 

// Old way without reactQuery
*/

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let response = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    // gcTime: 30000,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });


  return response;
}

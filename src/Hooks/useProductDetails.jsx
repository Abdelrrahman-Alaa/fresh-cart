
export default function useProductDetails({ id }) {

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let response = useQuery({
    queryKey: ["productDetails"],
    queryFn: getProductDetails,
    // gcTime: 30000,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });

  return response;
}

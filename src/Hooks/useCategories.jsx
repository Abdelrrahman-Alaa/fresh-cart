import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let response = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    // gcTime: 30000,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    select: (data) => data.data.data
  });

  return response;
}

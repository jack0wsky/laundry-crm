import { useQuery } from "react-query";
import axios from "axios";
import { ERPProduct, ERPProductReadModel } from "@/shared/types";

export const useListProducts = () => {
  const { data, isLoading, error } = useQuery<
    ERPProduct[],
    Error,
    ERPProductReadModel[]
  >(
    "comarch-comarch-erp.products-list",
    async () => await axios.get("/api/products").then((res) => res.data),
    {
      select: (products) =>
        products.map((product) => {
          const name = product.Name.replace(/USŁ. PRALNICZA /, "").toLowerCase();

          return {
            id: product.Id,
            name,
          };
        }),
    },
  );

  return {
    products: data || [],
    loading: isLoading,
    error,
  };
};

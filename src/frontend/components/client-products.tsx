import { ClientProduct } from "@/shared/types";

interface ClientProductsProps {
  products: ClientProduct[];
}
export const ClientProducts = ({ products }: ClientProductsProps) => {
  return (
    <ul className="flex flex-col gap-y-4 mt-4">
      {products
        .sort((a, b) => {
          if (a.Quantity > b.Quantity) return -1;
          if (a.Quantity < b.Quantity) return 1;
          return 0;
        })
        .map((product) => {
          if (!product.Name) return null;

          return (
            <li className="flex w-full flex-col" key={product.Name}>
              <p>{product.ProductId !== 0 ? product.ProductId : "n/a"}</p>
              <p className="text-xl capitalize">{product.Name}</p>

              <div className="flex justify-between">
                <p>Ilość: {product.Quantity}</p>
                <p>Cena: {product.Price} zł</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

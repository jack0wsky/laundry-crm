import { PricingListingItem } from "@/modules/hotels/pricing/PricingListingItem";
import { Pricing } from "@/modules/hotels/pricing/types";

interface ProductsListingProps {
  pricing: Pricing[];
  onProductEdit: (product: Pricing) => void;
  onProductDelete: (product: Pricing) => void;
}

export const ProductsListing = ({
  pricing,
  onProductEdit,
  onProductDelete,
}: ProductsListingProps) => {
  return (
    <ul className="flex flex-col gap-3 w-full overflow-y-auto">
      {pricing.map((item) => (
        <PricingListingItem
          key={`${item.id}-${item.product.name}`}
          name={item.product.name}
          price={item.price}
          onEdit={() => onProductEdit(item)}
          onDelete={() => onProductDelete(item)}
        />
      ))}
    </ul>
  );
};

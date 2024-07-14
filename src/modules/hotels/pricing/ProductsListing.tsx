import { PricingListingItem } from "@/modules/hotels/pricing/PricingListingItem";
import { Pricing } from "@/modules/hotels/pricing/types";
import { motion } from "framer-motion";

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
    <motion.ul
      className="flex flex-col gap-3 w-full overflow-y-auto"
      initial="hidden"
      animate="animate"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { bounce: 0, staggerChildren: 0.02 },
        },
      }}
    >
      {pricing.map((item) => (
        <PricingListingItem
          key={`${item.id}-${item.product.name}`}
          name={item.product.name}
          price={item.price}
          onEdit={() => onProductEdit(item)}
          onDelete={() => onProductDelete(item)}
        />
      ))}
    </motion.ul>
  );
};

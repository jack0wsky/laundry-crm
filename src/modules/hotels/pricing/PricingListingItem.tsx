interface PricingListingItemProps {
  name: string;
  price: number;
}
export const PricingListingItem = ({
  name,
  price,
}: PricingListingItemProps) => {
  return (
    <li className="w-full flex justify-between border-b border-palette-gray-100 pb-2 items-center">
      <p className="font-medium text-lg capitalize mr-2">{name}</p>
      <div className="flex items-center gap-x-1 px-3 py-1.5 border border-palette-gray-100 rounded-full">
        <p>{price}</p> zł
      </div>
    </li>
  );
};

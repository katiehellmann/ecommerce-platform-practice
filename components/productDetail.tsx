"use client";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cartStore";
interface Props {
  product: Stripe.Product;
}
export const ProductDetail = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  //use the hook created from cartStore
  const {items, addItem, removeItem,} = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  //check if there is some in the cart to display quantity, otherwise the quantity is 0
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
        id: product.id,
        name: product.name,
        price: price.unit_amount as number,
        imageURL: product.images ? product.images[0] : "./noImage.svg",
        quantity: 1,
    })
  }

  return (
    <div  className="font-serif container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {/* make sure there is an image */}
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            alt={product.name}
            src={product.images[0]}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {/* price and description */}
        {product.description && (
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
        <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => removeItem(product.id)}>
                -
            </Button>
            <span>{quantity}</span>
            <Button variant="outline" onClick={onAddItem}>
                +
            </Button>
        </div>
      </div>
    </div>
  );
};

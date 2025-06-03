import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}
export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="font-serif text-textColor block h-full"
    >
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {/* make sure there is an image */}
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full">
            <Image
              alt={product.name}
              src={product.images[0]}
              layout="fill"
              objectFit="cover"
              className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
            />
          </div>
        )}
        <CardHeader className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
          <CardContent className="p-4 flex flex-col flex-grow w-full">
            {/* price and description */}
            {product.description && (
              <p className="text-textColor/80 text-sm mb-2">
                {product.description}
              </p>
            )}
            {price && price.unit_amount && (
              <p className="text-lg font-semibold text-textColor/90">
                ${(price.unit_amount / 100).toFixed(2)}
              </p>
            )}

            <div className="mt-auto pt-4">
              <Button className="bg-accent1 hover:bg-accent1/70 text-white w-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
};

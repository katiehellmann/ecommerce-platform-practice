import { stripe } from "@/lib/stripe";
import { ProductDetail } from "@/components/productDetail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
//access product id through props
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));
  return (
     <div>
  <ProductDetail product={plainProduct} />
  <Link href={"/products"}>
  <Button className="bg-accent1 hover:bg-accent1/70" variant={"default"}>Back To Products</Button>
  </Link>
  </div>
  );
}

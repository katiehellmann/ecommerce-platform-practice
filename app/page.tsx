import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  //get products
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5, //only account for first five products for carosel
  });

  return (
    <div>
      <section className="rounded bg-neutral-100 items-center justify-center py-8 sm:py-12">
        <div className="mx-auto flex flex-col items-center justify-center gap-8 px-8 sm:px-16 md:flex-row">
          <div className="max-w-md space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Ecommerce
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-4 bg-pink-400 text-white hover:bg-pink-700"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          <Image
            alt="Hero Image"
            //todo: set default image to something nice if the first product doesn't have an image
            src={products.data[0].images[0]?products.data[0].images[0]:"/noImage.svg"}
            className="rounded"
            width={450}
            height={450}
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data}/>
      </section>
    </div>
  );
}

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
      <section className="rounded bg-card items-center justify-center py-8 sm:py-12 text-textColor">
        <div className="mx-auto flex flex-col items-center justify-center gap-8 px-8 sm:px-16 md:flex-row">
          <div className="max-w-md space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to Busy Bee Farms!
            </h1>
            <h2 className="text-xl md:text-2xl  font-semibold text-neutral-600">
              Taste the beauty of nature.
            </h2>
            <p className="text-lg md:text-xl text-neutral-600">
              Located in the heart of Western New York, Busy Bee Farms has been
              serving the Greater Rochester Area for over 10 years.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-4 text-lg bg-accent1 text-white hover:bg-accent1/70"
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
            src={"/hero.jpg"}
            className="rounded"
            width={450}
            height={450}
          />
        </div>
      </section>
      <section className="py-8">
        <h2 className="pb-6 text-xl md:text-2xl text-center font-semibold text-neutral-600">
          Shop Featured Products:
        </h2>
        <hr className="w-48 h-1 mx-auto mb-4 bg-textColor" />
        <Carousel products={products.data} />
      </section>
    </div>
  );
}

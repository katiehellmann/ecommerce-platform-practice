"use client";
import Link from "next/link";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
//get all the products
interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
//set the carosel to defaul the first element
const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    //set the image cycle interval
    const interval = setInterval(() => {
        setCurrent((prev) => (prev+1)%products.length) 
    }, 6000);
    //clear the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return(
    <Link href={`/products/${currentProduct.id}`}>
  <Card className="font-serif relative overflow-hidden h-80 rounded-lg shadow-md bg-card border-gray-300">
    {/* make sure there is an image */}
    {currentProduct.images && currentProduct.images[0] && (
    <div className="relative h-80 w-full">
        <Image alt={currentProduct.name} src={currentProduct.images[0]} layout="fill" objectFit="cover"  className="transition-opacity duration-500 ease-in-out"/>
    </div>
  )}
  <CardContent  className="absolute inset-0 flex flex-col items-center justify-center ">
    <div className="flex flex-col items-center justify center bg-primaryUI/70 p-4 rounded">
    <CardTitle className="text-3xl font-bold text-white mb-2">{currentProduct.name}</CardTitle>
    {/* make sure there is a price and format*/}
    {price && price.unit_amount && <p className="text-xl text-white">${(price.unit_amount/100).toFixed(2)}</p>}
    </div>
  </CardContent>
  </Card>
  </Link>
);
};

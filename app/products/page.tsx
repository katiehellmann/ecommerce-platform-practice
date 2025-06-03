import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductList } from "@/components/productList";

export default async function ProductsPage(){
    //fetch all products  
    const products = await stripe.products.list({
        expand: ["data.default_price"],
      });
    return<div>
        <h1>All Products</h1>
        <ProductList products={products.data}/>
    </div>
}
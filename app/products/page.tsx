
import { stripe } from "@/lib/stripe";

import { ProductList } from "@/components/productList";

export default async function ProductsPage(){
    //fetch all products  
    const products = await stripe.products.list({
        expand: ["data.default_price"],
      });
    return<div>
        <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
        <hr className="w-48 h-1 mx-auto mb-4 bg-textColor"/>
        <ProductList products={products.data}/>
    </div>
}
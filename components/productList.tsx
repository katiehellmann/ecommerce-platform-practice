"use client";
import Stripe from "stripe";
import { ProductCard } from "./productCard";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
}
export const ProductList = ({ products }: Props) => {
  //create filtering system
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredProducts = products.filter((product) => {
    //compare normalized terms (lowercase)
    //check names
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    //also check description only if the description is not null
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;
      //send back products
      return nameMatch || descriptionMatch;
  });

  

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search products..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((_product, _key) => {
          return (
            <li key={_key}>
              <ProductCard product={_product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

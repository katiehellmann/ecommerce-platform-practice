"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { CheckoutAction } from "./checkoutAction";

export default function CheckoutPage() {
  const { items, addItem, removeItem } = useCartStore();
  //find the total price of all items
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  //return a base case, only if the cart is empty
  if (total === 0 || items.length === 0) {
    return (
      <div className="container mx-auto px-4 ">
        <h1 className="text-3xl font-bold mb-4 text-center">Checkout</h1>
        <hr className="w-48 h-1 mx-auto mb-4 bg-textColor" />
        <Card className="container max-w-md  mx-auto px-4 py-8 text-center">
          <h1>Your Cart is Empty!</h1>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-3xl font-bold mb-4 text-center">Checkout</h1>
      <hr className="w-48 h-1 mx-auto mb-4 bg-textColor" />

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form action={CheckoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant="default" className="w-full bg-accent1 hover:bg-accent1/70">
          Proceed to Payment
        </Button>

        {/* <Button onClick={() => clearCart()} variant={"default"} className="w-full">
            Clear Cart
        </Button> */}
      </form>
    </div>
  );
}

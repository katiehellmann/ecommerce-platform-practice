import { stat } from "fs";
import { create } from "zustand";
import { persist } from "zustand/middleware";
//define what an item in the cart is
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageURL: string | null;
  quantity: number;
}

//utlizes store
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}
//export as hook using zustand, pesist data using local storage
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => {
        //manipulate store by returning items to the state
        set((state) => {
          //check if item already exists to increment the quantity number
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              //loop through all items to find the one we need to add quantity to
              items: state.items.map(
                (i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + item.quantity } //if found, add
                    : i //if not, leave the same
              ),
            };
          }
          //if the item doesn't already exist in the cart, add it to the array
          return { items: [...state.items, item] };
        });
      },
      removeItem: (id) =>
        set((state) => {
          return {
            //go through all items
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } //if found, remove one
            : item //otherwise, leave the same
            ).filter((item) => item.quantity > 0 ), //remove any items that have a quantity of 0 (or a negative #)
          };
        }),

      //clear the cart by returning an empty array
      clearCart: () =>
        set(() => {
          return { items: [] };
        }),
    }),
    //names the localstorage variable
    { name: "cart" }
  )
);

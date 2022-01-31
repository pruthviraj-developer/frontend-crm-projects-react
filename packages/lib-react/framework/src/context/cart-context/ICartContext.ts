export type ICartContext = {
  cartItemQty: string | number;
  updateCartItemQty: (qty: number) => void;
};

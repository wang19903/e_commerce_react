export const selectIsCartOpen = (state) => {
  console.log("select", state);
  return state.cart.isCartOpen;
};

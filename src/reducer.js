export const getCartTotal = (cart) => 
cart?.reduce((amount, item) => (item.dollars/item.jsonResponse) + amount, 0);


export const getDollarsTotal = (cart) =>
cart?.reduce((amount, item) => parseFloat((item.dollars)) + amount, 0);

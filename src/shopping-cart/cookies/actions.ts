import { getCookie, hasCookie, setCookie } from "cookies-next";

/**
 {
  'id1' => count 
  'id2' => count 
 }
 */

const CARD_KEY = 'cart'

export const getShoppingCartCookie = (): Record<string, number> => {
  if (!hasCookie(CARD_KEY)) return {}
  return JSON.parse(getCookie(CARD_KEY) ?? '{}')
}

export const addProductToCardCookie = (productId: string): void => {
  const cart = getShoppingCartCookie()

  if (cart[productId]) {
    cart[productId] += 1;
  } else {
    cart[productId] = 1;
  }

  setCookie(CARD_KEY, cart)
}

export const removeProductToCardCookie = (productId: string) => {
  const cart = getShoppingCartCookie()
  delete cart[productId]
  setCookie(CARD_KEY, cart)
}

export const removeItemToCardCookie = (productoId: string) => {
  const cart = getShoppingCartCookie()
  if (!cart[productoId]) return;

  const itemsInCart = cart[productoId] - 1;
  if (itemsInCart <= 0) {
    delete cart[productoId]
  } else {
    cart[productoId] = itemsInCart;
  }

  setCookie(CARD_KEY, cart);
}
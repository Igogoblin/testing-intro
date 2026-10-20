function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product,quantity=1) { 
  if (quantity <= 0) {
    throw new RangeError('Количество товара должно быть больше нуля');
  }
  if (quantity > product.stock) {
    throw new RangeError('Количество товара не может превышать остаток на складе');
  }
  
  const existingItem = cart.find(item => item.id === product.id);
if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock) {
      throw new RangeError('Превышен остаток на складе');
    }
    existingItem.quantity = newQuantity;
  } else {
    cart.push({ ...product, quantity });
  }
  return cart;
 }
function changeQuantity(cart, productId, quantity) { 
  if (quantity <= 0) {
    throw new RangeError('Количество товара должно быть больше нуля');
  }
  const item = cart.find(item => item.id === productId);
  if (!item) {
    return cart;
  }
  if (quantity > item.stock) {
    throw new RangeError('Количество товара не может превышать остаток на складе');
  }
  item.quantity = quantity;
  return cart;
 }
function removeFromCart(cart, productId) { 
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  return cart;
 }
function calculateCartSubtotal(cart) { 
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
 }
function calculateOrderTotal(cart, promoCode) { 
const subtotal = calculateCartSubtotal(cart);
  
  if (subtotal === 0) {
return {
      subtotal: 0,
      discount: 0,
      delivery: 0,
      total: 0,
    };
  }

  let discount = 0;
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

const delivery = subtotal < 50000 ? 30000 : 0;

  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
 }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

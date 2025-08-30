const menu = [
  { id: 1, name: "🍕 Пицца", price: 50 },
  { id: 2, name: "🍔 Бургер", price: 30 },
  { id: 3, name: "🌭 Хот-дог", price: 20 },
  { id: 4, name: "🥗 Салат", price: 25 },
  { id: 5, name: "🍣 Суши", price: 60 },
  { id: 6, name: "🥟 Манты", price: 40 },
  { id: 7, name: "🍜 Лапша", price: 35 },
  { id: 8, name: "🥩 Стейк", price: 90 },
  { id: 9, name: "🍟 Картошка", price: 15 },
  { id: 10, name: "🥤 Напиток", price: 10 }
];

const menuDiv = document.getElementById("menu");
const cartBtn = document.getElementById("cartBtn");
const cartDiv = document.getElementById("cart");
const cartItemsList = document.getElementById("cartItems");
const orderBtn = document.getElementById("orderBtn");

let cart = [];

// отображение меню
menu.forEach(item => {
  const div = document.createElement("div");
  div.innerHTML = `${item.name} - ${item.price} TJS <button onclick="addToCart(${item.id})">Добавить</button>`;
  menuDiv.appendChild(div);
});

function addToCart(id) {
  const item = menu.find(i => i.id === id);
  const cartItem = cart.find(i => i.id === id);
  if (cartItem) {
    cartItem.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

function changeQty(id, delta) {
  const cartItem = cart.find(i => i.id === id);
  if (cartItem) {
    cartItem.qty += delta;
    if (cartItem.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    renderCart();
  }
}

function renderCart() {
  cartItemsList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.qty} — ${item.price * item.qty} TJS 
      <button onclick="changeQty(${item.id}, 1)">+</button> 
      <button onclick="changeQty(${item.id}, -1)">-</button>`;
    cartItemsList.appendChild(li);
  });
}

cartBtn.addEventListener("click", () => {
  cartDiv.classList.toggle("hidden");
});

orderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Корзина пуста!");
    return;
  }
  alert("Заказ отправлен ✅");
  cart = [];
  renderCart();
});

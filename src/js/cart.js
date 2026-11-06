import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

function removeCartItem(event) {
  const productId = event.currentTarget.dataset.id;
  const cartItems = getLocalStorage("so-cart") || [];

  const index = cartItems.findIndex((item) => item.Id === productId);
  if (index === -1) return;

  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button
    type="button"
    class="cart-card__remove"
    data-id="${item.Id}"
    aria-label="Remove item from cart"
    title="Remove item from cart"
  >
    <img src="/images/close.svg" alt="" width="32" height="32" />
  </button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
function renderCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartFooter = document.querySelector(".cart-footer");
  const totalEl = document.getElementById("cart-total");

  if (cartItems.length === 0) {
    cartFooter.classList.add("hidden");
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.FinalPrice);
  }, 0);

  totalEl.textContent = total.toFixed(2);
  cartFooter.classList.remove("hidden");
}

renderCartTotal();

renderCartContents();

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

renderCartContents();

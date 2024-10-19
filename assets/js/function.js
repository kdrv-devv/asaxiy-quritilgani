import { products } from "./index.js";
import { counter2 } from "./shop.js";
let regx = RegExp(/[a-z\s\']/, "g");

function addData({ img, title, price, rate }) {
  let userPrice = Number(price.replace(regx, ""));
  let card = document.createElement("card");
  card.classList.add("card");
  card.innerHTML += `
     <div class="card">
                  <img class="img" src=${img}></img>
                  <p class="title">${title}</p>
                  <div class="rating">
                      <div class="stars">
                      ${Array.from({ length: rate })
                        .map(
                          (_, value) =>
                            `<i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>`
                        )
                        .join(" ")}
                        ${Array.from({ length: 5 - rate })
                          .map(
                            (_, value) =>
                              `<i class="fa-regular fa-star fa-2xs" style="color: #FFD43B;"></i>`
                          )
                          .join(" ")}
                        
                        
                      </div>
                      <div class="comments">
                          4 отзывов
                      </div>
                  </div>
                  <div class="price">
                      <div class="real_price">${price}</div>
                      <div class="precent_price">${price}</div>
                      <div class="monthly_price">${
                        Math.round(userPrice / 12) + " x 12 мес"
                      }</div>
                  </div>
                  <div class="adding_product">
                      <button class="btn">Купить в один клик</button>
                      <button class="btn_shop">
                          <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
                      </button>
                  </div>
              </div>
     `;
  products.append(card);
}
function addDataTocart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.find((value) => value?.id === product?.id)) {
    cart = cart.map((value) => {
      if (value?.id === product?.id) {
        return {
          ...value,
        };
      }
      return value;
    });
    return;
  }

  cart = [
    ...cart,
    {
      ...product,
      counter: 1,
      userPrice: Number(product.price?.replace(regx, "")),
    },
  ];
  localStorage.setItem("cart", JSON.stringify(cart));
  counter2.textContent = cart.length;
}

export { addData, addDataTocart };

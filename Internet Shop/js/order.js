'use strict';

const main = document.getElementsByTagName("main");
const orderLeftside = document.getElementsByClassName("order-leftside");
const totalPriceHTML = document.getElementsByClassName("order-card__total-price");
const container = document.getElementsByClassName("empty-container");

let totalPrice = 0;
let productsLocalStorage = [];

const emptyOrder = ` 
 <section class="order-empty">   
     <img src="./img/empty_order_img.svg" alt="">
        <h2>Корзина пуста</h2>
        <h4>Но это никогда не поздно исправить :).</h4>
        <button class="custom__btn">
            <a href="index.html" class="button28">В каталог товаров</a>
        </button>
 </section>`;

function renderEmptyOrder() {
  container[0].classList.add("hidden");
  const divCard = document.createElement('div');
  divCard.innerHTML = emptyOrder;
  main[0].append(divCard);
}

function getDataFromLocalStorage() {
  productsLocalStorage = JSON.parse(window.localStorage.getItem("products"));

  if (productsLocalStorage.length !== 0) {
    productsLocalStorage.forEach(item => {
      totalPrice += parseInt(item.price) * parseInt(item.count);
      const divCard = document.createElement('div');
      divCard.className = "order-card order-card_buy";
      divCard.innerHTML =
        `
        <div class="order-card-main">
            <img class="order-card__delete-img" data-id="${item.id}" src="./img/delete.svg" alt="Кнопка удаления товара">
            <img class="order-card__img" src="${item.image}" alt="Товар">
            <div class="order-card__text">
                <span class="order-card__name">${item.name}</span>
                <span class="order-card__price">${item.price}</span>
            </div>
        </div>
        <div class="order-card__footer">
            <div class="order-card__button-count">
                <div class="order-card__minus-btn"></div>
                <span class="order-card__current-count" id="${item.id}">${item.count}</span>
                <div class="order-card__plus-btn"></div>
            </div>
    
            <div class="order-card__card-price">
                ${parseInt(item.count) * parseInt(item.price)} ₽
            </div>
        </div>
      `;
      orderLeftside[0].append(divCard);
    });
    totalPriceHTML[0].innerHTML = `${totalPrice} ₽`;
  } else {
    renderEmptyOrder();
  }
}

function siblings(target) {
  let siblings = Array.prototype.slice.call(target.parentNode.children);
  siblings.forEach((item, i) => {
    if (siblings[i] === target) {
      siblings.splice(i, 1);
    }
  });
  return siblings;
}

function changeCountOfProduct(e, isIncrement) {
  let target = e.target;
  let siblingsButton = siblings(target);
  let parentButtonBlock = target.closest(".order-card__button-count");
  let totalPriceCard = siblings(parentButtonBlock)[0];
  let targetProduct;

  if (isIncrement) {
    targetProduct = siblingsButton[1];
  } else {
    targetProduct = siblingsButton[0];
  }

  productsLocalStorage.forEach(item => {

    if (isIncrement) {
      if (parseInt(item.id) === parseInt(targetProduct.id)) {
        targetProduct.innerText = parseInt(item.count) + 1;
        item.count = parseInt(item.count) + 1;
        totalPrice += parseInt(item.price);
        totalPriceCard.innerText = `${parseInt(item.count) * parseInt(item.price)} ₽`;
      }
    } else {
      if (parseInt(item.id) === parseInt(targetProduct.id)) {
        if (parseInt(item.count) > 0) {
          targetProduct.innerText = parseInt(item.count) - 1;
          item.count = parseInt(item.count) - 1;
          totalPrice -= parseInt(item.price);
          totalPriceCard.innerText = `${parseInt(item.count) * parseInt(item.price)} ₽`;
        }
      }
    }
  });
  totalPriceHTML[0].innerHTML = `${totalPrice} ₽`;
  localStorage.setItem("products", JSON.stringify(productsLocalStorage));
}


function deleteProduct(e) {
  const target = e.target;
  const currentCardId = e.target.dataset.id;
  let parentOrderCard = target.closest(".order-card");

  productsLocalStorage = productsLocalStorage.filter(item => parseInt(item.id) !== parseInt(currentCardId));
  totalPrice = 0;
  productsLocalStorage.forEach(item => {
    totalPrice += parseInt(item.price) * parseInt(item.count);
  });
  totalPriceHTML[0].innerHTML = `${totalPrice} ₽`;
  localStorage.setItem("products", JSON.stringify(productsLocalStorage));
  parentOrderCard.parentNode.removeChild(parentOrderCard);

  if (productsLocalStorage.length === 0) {
    renderEmptyOrder()
  }
}

window.onload = getDataFromLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
  const btnPlus = document.querySelectorAll(".order-card__plus-btn");
  const btnMinus = document.querySelectorAll(".order-card__minus-btn");
  const deleteProductImg = document.querySelectorAll(".order-card__delete-img");

  btnPlus.forEach(item => {
    item.addEventListener("click", (e) => {
      changeCountOfProduct(e, true);
    });
  });

  btnMinus.forEach(item => {
    item.addEventListener("click", (e) => {
      changeCountOfProduct(e, false);
    });
  });

  deleteProductImg.forEach(item => {
    item.addEventListener("click", (e) => {
      deleteProduct(e)
    })
  });
});
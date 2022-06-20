'use strict';

const productsHeadphones = [
  {
    id: 1,
    name: "Apple BYZ S852I",
    price: "2927 ₽",
    rate: "4.7",
    image: {
      type: 'img__type1',
      src: "./img/Headphones_img1.png"
    },
    isFavorite: false,
    isWireless: false
  },
  {
    id: 2,
    name: "Apple EarPods",
    price: "2327 ₽",
    rate: "4.5",
    image: {
      type: 'img__type1',
      src: "./img/Headphones_img2.png"
    },
    isFavorite: true,
    isWireless: false
  },
  {
    id: 3,
    name: "Apple EarPods",
    price: "2327 ₽",
    rate: "4.5",
    image: {
      type: 'img__type2',
      src: "./img/Headphones_img3.png"
    },
    isFavorite: false,
    isWireless: false
  },
  {
    id: 4,
    name: "Apple BYZ S852I",
    price: "2927 ₽",
    rate: "4.7",
    image: {
      type: 'img__type1',
      src: "./img/Headphones_img1.png"
    },
    isFavorite: true,
    isWireless: false
  },
  {
    id: 5,
    name: "Apple EarPods",
    price: "2327 ₽",
    rate: "4.5",
    image: {
      type: 'img__type1',
      src: "./img/Headphones_img2.png"
    },
    isFavorite: false,
    isWireless: false
  },
  {
    id: 6,
    name: "Apple EarPods",
    price: "2327 ₽",
    rate: "4.5",
    image: {
      type: 'img__type2',
      src: "./img/Headphones_img3.png"
    },
    isFavorite: false,
    isWireless: false
  },
  {
    id: 7,
    name: "Apple AirPods",
    price: "9527 ₽",
    rate: "4.7",
    image: {
      type: 'img__type1',
      src: "./img/wireless_img1.png"
    },
    isFavorite: false,
    isWireless: true
  },
  {
    id: 8,
    name: "GERLAX GH-04",
    price: "10314 ₽",
    rate: "4.7",
    image: {
      type: 'img__type1',
      src: "./img/wireless_img2.png"
    },
    isFavorite: false,
    isWireless: true
  },
  {
    id: 9,
    name: "BOROFONE BO4",
    price: "12987 ₽",
    rate: "4.8",
    image: {
      type: 'img__type1',
      src: "./img/wireless_img3.png"
    },
    isFavorite: false,
    isWireless: true
  }
];

const headphonesCards = document.getElementsByClassName("headphones__cards");
const wirelessHeadphonesCards = document.getElementsByClassName("wireless__headphones__cards");
const productAdded = document.getElementsByClassName("product-added");
let productsLocalStorage = [];

function addHtmlToDiv(product) {
  product.forEach((item) => {
    const divCard = document.createElement('div');
    divCard.className = "headphones__card";
    divCard.innerHTML = `
      <div class="favorit__icon">
          <img src="${item.isFavorite ? "./img/pull_hart_img.svg" : "./img/favorites_hart_img.svg"}" alt="favorites_hart">
      </div>
      <img class="${item.image.type}" src="${item.image.src}" alt="${item.name}">
      <div class="headphones__wrapper">
          <div class="headphones__card-left">
              <p>${item.name}</p>
              
              <div class="headphones__card-star">
                  <img class="star__img" src="./img/Star_img.svg" alt="star_img">
                  <p>${item.rate}</p>
              </div>
          </div>
          <div class="headphones__card-right">
              <p class="text__price">${item.price} ₽</p>
          </div>
          <div class="buy__product">
              <button class="custom-btn btn-16 btn-buy-product" id="${item.id}">Купить</button>
          </div>
      </div>
    `;
    if (!item.isWireless) {
      headphonesCards[0].append(divCard);
    } else {
      wirelessHeadphonesCards[0].append(divCard);
    }
  });
}

function getProductsFromLocalStorage() {
  if (window.localStorage.getItem("products")) {
    productsLocalStorage = JSON.parse(window.localStorage.getItem("products"));
  }
}

function onLoad() {
  addHtmlToDiv(productsHeadphones);
  getProductsFromLocalStorage();
}

function addProductToBuyCard(id) {
  let currentProduct = productsHeadphones.filter(item => item.id === id);
  let hasCurrentProductInLocalStorage = productsLocalStorage.find(item => currentProduct[0].id === item.id);

  if (hasCurrentProductInLocalStorage) {
    productsLocalStorage.forEach(item => {
      if (item.id === hasCurrentProductInLocalStorage.id) {
        item.count = item.count + 1;
      }
    });
    localStorage.setItem("products", JSON.stringify(productsLocalStorage));
  } else {

    let objForSaveToLocalStorage = {
      id: currentProduct[0].id,
      name: currentProduct[0].name,
      image: currentProduct[0].image.src,
      price: currentProduct[0].price,
      count: 1
    };

    productsLocalStorage.push(objForSaveToLocalStorage);
    localStorage.setItem("products", JSON.stringify(productsLocalStorage));
  }
}

window.onload = onLoad();

document.addEventListener("DOMContentLoaded", () => {
  const buttonBuyProduct = document.querySelectorAll(".btn-buy-product");

  buttonBuyProduct.forEach(item => {
    item.addEventListener("click", ($event) => {
      let id = parseInt($event.target.id);
      addProductToBuyCard(id);
      showAddedBProductBlock();
    });
  })
});

function showAddedBProductBlock() {
  productAdded[0].classList.remove('hidden');
  setTimeout(() => {
    productAdded[0].classList.add('hidden');
  }, 3000);
}
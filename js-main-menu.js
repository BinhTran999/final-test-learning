const saban_acc = document.querySelector("#number_market");
const services_type_click = document.getElementById("services-product-type");
const facilities_type_click = document.getElementById(
  "facilities-product-type"
);
const itemArr = [...document.querySelectorAll(".item .img-html")];
const itemNameArr = [...document.querySelectorAll(".item .text-content")];
const itemPriceArr = [...document.querySelectorAll(".item .price")];
const shoppingItemList = document.getElementById("myBox");
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const exitDetailItem = document.getElementById("exitAItem");

const itemABox = document.getElementById("itemSopBox");

console.log(typeof document.querySelectorAll(".item .img-html"));

let currentPage = 1;
let itemsPerPage = 12;

const modalBox = document.querySelectorAll(".item");
console.log(modalBox);

// function clickShowItem() {
//   modalBox.forEach((item, index) => {
//     item.addEventListener("click", () => {
//       showModal(index);
//     });
//   });
// }

// function showModal(index) {
//   console.log(`Box ${index + 1} được click ${index + 1} lần`);
// }

let it = 0;

const divItem = [...document.querySelectorAll(".item")];
const isItemClicked = Array(itemArr.length).fill(false);

itemArr.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    console.log(itemNameArr[index].textContent);
    itemSopBox.style.display = "block";
  });
});

exitDetailItem.addEventListener("click", (e) => {
  console.log(itemSopBox.style.display);
});

async function funcRequest(url, maxRetries = 10, retryDelay = 5) {
  let retries = 0;
  while (true) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 500 && retries < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          retries++;
          continue;
        }
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      if (error.message === "HTTP error 500" && retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        retries++;
        continue;
      }
      throw error;
    }
  }
}

window.onload = async function () {
  allData = [];
  const data = await funcRequest("http://10.63.161.172:3001/api/get-product");
  console.log(data.data.total / Object.keys(data.data.items).length + 1);

  for (
    let i = 0;
    i < data.data.total / Object.keys(data.data.items).length + 1;
    i++
  ) {
    const url_i = "http://10.63.161.172:3001/api/get-product?page=" + i;
    data_i = await funcRequest(url_i);
    allData.push(...data_i.data.items);
  }

  for (let i = 0; i < itemsPerPage; i++) {
    let bimg = "url('" + allData[i].image + "')";
    itemArr[i].style.backgroundImage = bimg;
    itemArr[i].style.backgroundSize = "100% 100%";
    itemNameArr[i].innerHTML = allData[i].name;
    itemPriceArr[i].innerHTML = allData[i].price + " VND";
  }
  console.log(allData);
};

async function getEnermyData() {
  allData = [];
  const data = await funcRequest("http://10.63.161.172:3001/api/get-product");

  for (
    let i = 0;
    i < data.data.total / Object.keys(data.data.items).length + 1;
    i++
  ) {
    const url_i = "http://10.63.161.172:3001/api/get-product?page=" + i;
    data_i = await funcRequest(url_i);
    allData.push(...data_i.data.items);
  }
  return allData;
}

async function processData() {
  var cachedData = null;
  if (cachedData !== null) {
    return cachedData;
  }
  const data = await getEnermyData();
  cachedData = data;
  return cachedData;
}

async function serviceClick() {
  let services = {};
  let newArray_services = new Array();
  services.data = newArray_services;
  let data = await processData();
  for (let i = 0; i < Object.keys(data).length; i++) {
    if (data[i].type === "service") {
      services.data.push(data[i]);
    }
  }
  console.log(services.data);
  for (let i = 0; i < Object.keys(services.data).length; i++) {
    let bimg = "url('" + services.data[i].image + "')";
    itemArr[i].style.backgroundImage = bimg;
    itemArr[i].style.backgroundSize = "100% 100%";
    itemNameArr[i].innerHTML = services.data[i].name;
    itemPriceArr[i].innerHTML = services.data[i].price + " VND";
  }
  // NEW
  const numberPage = Math.cell(
    Object.keys(services.data).length / itemsPerPage
  );
  let currentPageService = 1;
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
}

async function faciltitesClick() {
  let faciltites = {};
  let newArray_faciltites = new Array();
  faciltites.data = newArray_faciltites;
  let data = await processData();
  for (let i = 0; i < Object.keys(data).length; i++) {
    if (data[i].type === "facility") {
      faciltites.data.push(data[i]);
    }
  }
  for (let i = 0; i < Object.keys(faciltites.data).length; i++) {
    let bimg = "url('" + faciltites.data[i].image + "')";
    itemArr[i].style.backgroundImage = bimg;
    itemArr[i].style.backgroundSize = "100% 100%";
    itemNameArr[i].innerHTML = faciltites.data[i].name;
    itemPriceArr[i].innerHTML = faciltites.data[i].price + " VND";
  }
}

// async function listItem() {
//   document.getElementById("shopping").addEventListener("click", function () {
//     shoppingItemList.style.display === "none"
//       ? (shoppingItemList.style.display = "block")
//       : (shoppingItemList.style.display = "none");
//   });
// }

const divItemShopping = document.querySelector(".shopping_icon");

divItemShopping.addEventListener("click", (e) => {
  shoppingItemList.style.display === "none"
    ? (shoppingItemList.style.display = "block")
    : (shoppingItemList.style.display = "none");
});

function renderPagination() {
  console.log(122);
}

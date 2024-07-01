const sabanAcc = document.getElementById("number_market");
const services_type_click = document.getElementById("services-product-type");
const facilities_type_click = document.getElementById(
  "facilities-product-type"
);
const itemArr = [...document.querySelectorAll(".item .img-html")];
const itemNameArr = [...document.querySelectorAll(".item .text-content")];
const itemPriceArr = [...document.querySelectorAll(".item .price")];
const itemDescriptionArr = [...document.querySelectorAll(".item .description")];
const itemTypeArr = [...document.querySelectorAll(".item .type")];
const shoppingItemList = document.getElementById("myBox");
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const exitDetailItem = document.querySelector("#exitAItem");
const amountAllItemShop = document.querySelector("#amout");
const closeItemList = document.querySelector("#cancel");
const submitItem = document.querySelector("#submit");
// PAGE
const prevPage = document.querySelector("#prev-page");
const onePage = document.querySelector("#page-1");
const twoPage = document.querySelector("#page-2");
const thirdPage = document.querySelector("#page-3");
const nextPage = document.querySelector("#next-page");
//
const changeToSuccessScreen = document.querySelector("#changeToConfirmWindow");

const itemABox = document.getElementById("itemSopBox");
const confirmBox = document.getElementById("itemConfirmBox");
const exitConfirmBox = document.getElementById("exitConfirmBox");

const searchInput = document.querySelector("#search-text");
const searchButton = document.querySelector("#submit_search");

let currentPage = 1;

const divItem = [...document.querySelectorAll(".item")];
const isItemClicked = Array(itemArr.length).fill(false);
const itemImage = document.querySelector("#imageAItem");
const divItemShopping = document.querySelector("#shopping");
const clickAdd = document.querySelector("#add-to-cart");
// let CacheData = {};
let CacheArray = [];
var cacheAr = null;
let allData;
let numberPage;
const configPage = {
  pageSize: 12,
  currentPage: 1,
};

let isItemDisplay = 0;
let deleteButtonItems = [];

function initNewArrItem(index) {
  return [
    itemNameArr[index].textContent,
    itemTypeArr[index].textContent,
    itemPriceArr[index].textContent,
  ];
}

divItem.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    let i = 0;
    shoppingItemList.style.display = "none";
    itemSopBox.style.display = "block";
    itemImage.style.backgroundImage = itemArr[index].style.backgroundImage;
    document.querySelector("#name-item").textContent =
      "Name : " + itemNameArr[index].textContent;
    document.querySelector("#description-item").textContent =
      "Description : " + itemDescriptionArr[index].textContent;
    document.querySelector("#price-item").textContent =
      "Price : " + itemPriceArr[index].textContent;
    newArrItem = initNewArrItem(index);
    cacheAr = newArrItem;
  });
});

itemABox.addEventListener("click", function (event) {
  event.stopPropagation();
});

document.addEventListener("click", function (event) {
  if (!itemABox.contains(event.target) && isItemDisplay != 0) {
    isItemDisplay = 0;
    itemSopBox.style.display = "none";
  } else {
    isItemDisplay++;
  }
});

window.number_item = 300;

function saveItemToLocalStorage(data) {
  localStorage.setItem("itemData", JSON.stringify(data));
}

function saveNumberItemToLocalStorage(numberItem) {
  localStorage.setItem("numberItemData", JSON.stringify(numberItem));
}

function getItemFromLocalStorage() {
  const list = localStorage.getItem("itemData");
  return list ? JSON.parse(list) : [];
}

function getNumberItemFromLocalStorage() {
  const number = localStorage.getItem("numberItemData");
  return number ? parseInt(JSON.parse(number)) : 0;
}

clickAdd.addEventListener("click", (e) => {
  let currentValue = parseInt(sabanAcc.textContent);
  currentValue++;
  number_item = currentValue;
  sabanAcc.textContent = currentValue;
  saveNumberItemToLocalStorage(currentValue);
  shoppingItemList.style.display = "none";
  CacheArray.push(cacheAr);
  saveItemToLocalStorage(CacheArray);
});

sabanAcc.textContent = getNumberItemFromLocalStorage();
CacheArray = getItemFromLocalStorage();

exitDetailItem.addEventListener("click", (e) => {
  itemSopBox.style.display = "none";
});

async function funcRequest(url, maxRetries = 10, retryDelay = 5) {
  for (let retries = 0; retries < maxRetries; retries++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 500) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      if (error.message === "HTTP error 500") {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        continue;
      }
      if (retries === maxRetries - 1) {
        throw error;
      }
    }
  }
}

window.onload = async function () {
  allData = [];
  let data = await funcRequest("http://10.63.161.172:3001/api/get-product");
  numberPage = Math.round(data.data.total / configPage.pageSize) + 1;
  for (
    let i = 0;
    i < data.data.total / Object.keys(data.data.items).length + 1;
    i++
  ) {
    const url_i = "http://10.63.161.172:3001/api/get-product?page=" + i;
    data_i = await funcRequest(url_i);
    allData.push(...data_i.data.items);
  }
  for (let i = 0; i < configPage.pageSize; i++) {
    let bimg = "url('" + allData[i].image + "')";
    itemArr[i].style.backgroundImage = bimg;
    itemArr[i].style.backgroundSize = "100% 100%";
    itemNameArr[i].innerHTML = allData[i].name;
    itemPriceArr[i].innerHTML = allData[i].price + " VND";
    itemDescriptionArr[i].innerHTML = allData[i].description;
    itemTypeArr[i].innerHTML = allData[i].type;
  }
  data = allData;
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
  let currentNumberPage = 1;
  let nPage =
    Math.round(Object.keys(services.data).length / configPage.pageSize) + 1;
  changeStartPage();
  dataPage(currentNumberPage, services.data);
  allData = services.data;
  currentPage = 1;
  numberPage =
    Math.round(Object.keys(services.data).length / configPage.pageSize) + 1;
}

function changeStartPage() {
  prevPage.style.display = "none";
  onePage.style.display = "none";
  twoPage.style.display = "block";
  thirdPage.style.display = "block";
  nextPage.style.display = "block";
  twoPage.textContent = 1;
  thirdPage.textContent = 2;
}

function dataPage(currentPage, data) {
  let n;
  const startIndex = (currentPage - 1) * configPage.pageSize;
  for (let i = 0; i < configPage.pageSize; i++) {
    let bimg = "url('" + data[startIndex + i].image + "')";
    itemArr[i].style.backgroundImage = bimg;
    itemArr[i].style.backgroundSize = "100% 100%";
    itemNameArr[i].innerHTML = data[startIndex + i].name;
    itemPriceArr[i].innerHTML = data[startIndex + i].price + " VND";
    itemDescriptionArr[i].innerHTML = data[startIndex + i].description;
    itemTypeArr[i].innerHTML = data[startIndex + i].type;
    n = startIndex + i + 1;
    if (i + startIndex === Object.keys(data).length - 1) {
      break;
    }
  }
  if (n === Object.keys(data).length) {
    for (let i = n % 12; i < configPage.pageSize; i++) {
      divItem[i].style.display = "none";
    }
  } else {
    for (let i = 0; i < configPage.pageSize; i++) {
      divItem[i].style.display = "block";
    }
  }
}

thirdPage.addEventListener("click", (e) => {
  if (currentPage === 1) {
    onePage.style.display = "block";
    prevPage.style.display = "block";
  }

  if (currentPage === numberPage - 1) {
    thirdPage.style.display = "none";
    nextPage.style.display = "none";
  }
  currentPage++;
  onePage.textContent = currentPage - 1;
  twoPage.textContent = currentPage;
  thirdPage.textContent = currentPage + 1;
  dataPage(currentPage, allData);
});

nextPage.addEventListener("click", (e) => {
  if (currentPage === 1) {
    onePage.style.display = "block";
    prevPage.style.display = "block";
  }

  if (currentPage === numberPage - 1) {
    thirdPage.style.display = "none";
    nextPage.style.display = "none";
  }
  currentPage++;
  onePage.textContent = currentPage - 1;
  twoPage.textContent = currentPage;
  thirdPage.textContent = currentPage + 1;
  dataPage(currentPage, allData);
});

onePage.addEventListener("click", (e) => {
  if (currentPage === 2) {
    onePage.style.display = "none";
    prevPage.style.display = "none";
  }

  if (currentPage === numberPage) {
    thirdPage.style.display = "block";
    nextPage.style.display = "block";
  }
  currentPage--;
  onePage.textContent = currentPage - 1;
  twoPage.textContent = currentPage;
  thirdPage.textContent = currentPage + 1;
  dataPage(currentPage, allData);
});

prevPage.addEventListener("click", (e) => {
  if (currentPage === 2) {
    onePage.style.display = "none";
    prevPage.style.display = "none";
  }

  if (currentPage === numberPage) {
    thirdPage.style.display = "block";
    nextPage.style.display = "block";
  }
  currentPage--;
  onePage.textContent = currentPage - 1;
  twoPage.textContent = currentPage;
  thirdPage.textContent = currentPage + 1;
  dataPage(currentPage, allData);
});

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
  let currentNumberPage = 1;
  let nPage =
    Math.round(Object.keys(faciltites.data).length / configPage.pageSize) + 1;
  changeStartPage();
  dataPage(currentNumberPage, faciltites.data);
  allData = faciltites.data;
  currentPage = 1;
  numberPage =
    Math.round(Object.keys(faciltites.data).length / configPage.pageSize) + 1;
}

function ArrToDic(data) {
  let frequencyDict = {};
  for (let item of data) {
    if (frequencyDict[item[0]]) {
      frequencyDict[item[0]].quanlity += 1;
    } else {
      let dicData = {
        name: item[0],
        type: item[1],
        quanlity: 1,
        price: item[2],
      };
      frequencyDict[item[0]] = dicData;
    }
  }
  return frequencyDict;
}

const listShopItem = document.querySelector(".list-shop-item");

divItemShopping.addEventListener("click", (e) => {
  const tableToRemove = listShopItem.querySelector("table");
  const itemDic = ArrToDic(CacheArray);
  if (shoppingItemList.style.display === "none") {
    shoppingItemList.style.display = "block";
    // CacheData = itemDic;
    var arr = [];
    for (var key in itemDic) {
      if (itemDic.hasOwnProperty(key)) {
        arr.push([itemDic[key]]);
      }
    }
    let table = createTable(arr);
    listShopItem.appendChild(table);
    let totalPrice = 0;
    for (item of arr) {
      let amountWithoutSuffix = item[0].price.slice(0, -4);
      let amountNumber = parseInt(amountWithoutSuffix);
      let numberOfItem = parseInt(item[0].quanlity);
      totalPrice += amountNumber * numberOfItem;
    }
    console.log(CacheArray);
    amountAllItemShop.textContent = totalPrice + " VND";
    const rows = listShopItem.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      const deleteButton = rows[i].getElementsByTagName("button")[0];
      console.log(deleteButton);
      deleteButton.addEventListener("click", function () {
        console.log(i);
        arr.splice(i, 1);
        rows[i].remove();
      });
    }
  } else {
    deleteButtonItems = [];
    shoppingItemList.style.display = "none";
  }

  // deleteButtonItems.forEach((item, index) => {
  //   item.addEventListener("click", () => {
  //     let startTime = performance.now();
  //     console.log(index);
  //     if (listShopItem.getElementsByTagName("table")[0].rows.length === 1) {
  //       listShopItem.removeChild(table);
  //       CacheArray = [];
  //       shoppingItemList.style.display = "none";
  //       deleteButtonItems = [];
  //       let currentValue = parseInt(sabanAcc.textContent);
  //       currentValue = 0;
  //       number_item = currentValue;
  //       sabanAcc.textContent = currentValue;
  //     } else {
  //       listShopItem.getElementsByTagName("table")[0].deleteRow(index);
  //       const deleteItemName = CacheArray[index][0];
  //       const newCacheArray = CacheArray.filter(function (item) {
  //         return item[0] != deleteItemName;
  //       });
  //       CacheArray = newCacheArray;
  //       deleteButtonItems.splice(index, 1);
  //       arr.splice(index, 1);
  //       let currentValue = parseInt(sabanAcc.textContent);
  //       currentValue -= itemDic[deleteItemName].quanlity;
  //       number_item = currentValue;
  //       sabanAcc.textContent = currentValue;
  //     }
  //     let endTime = performance.now();
  //     console.log(endTime - startTime);
  //   });
  // });
  tableToRemove.remove();
});

function createTable(arr) {
  const numRows = Object.keys(arr).length;
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.border = "1px solid black";
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");
    row.style.border = "1px solid black";
    for (let j = 0; j < 3; j++) {
      if (j === 0) {
        const cell = document.createElement("td");
        cell.style.border = "1px solid black";
        cell.textContent = arr[i][0].name + "(x" + arr[i][0].quanlity + ")";
        row.appendChild(cell);
        cell.style.width = "150px";
        cell.style.height = "20px";
      }
      if (j === 1) {
        const cell = document.createElement("td");
        cell.style.border = "1px solid black";
        cell.textContent =
          parseInt(arr[i][0].price) * parseInt(arr[i][0].quanlity) + " VND";
        row.appendChild(cell);
        cell.style.width = "150px";
        cell.style.height = "20px";
      }
      if (j === 2) {
        const cell = document.createElement("button");
        cell.rowIndex = i;
        row.appendChild(cell);
        cell.textContent = "delete";
        cell.style.backgroundColor = "black";
        cell.style.background = "white";
        cell.style.width = "100px";
        deleteButtonItems.push(cell);
      }
    }
    table.appendChild(row);
  }

  return table;
}

closeItemList.addEventListener("click", (e) => {
  const tableToRemove = listShopItem.querySelector("table");
  tableToRemove.remove();
  shoppingItemList.style.display = "none";
  deleteButtonItems = [];
});

submitItem.addEventListener("click", (e) => {
  confirmBox.style.display = "block";
});

exitConfirmBox.addEventListener("click", (e) => {
  confirmBox.style.display = "none";
});

changeToSuccessScreen.addEventListener("click", (e) => {
  setTimeout(function () {
    window.location.href = "order-detal.html";
  }, 3000);
});

searchInput.addEventListener(
  "input",
  throttledDebounce(
    () => {
      const searchTerm = searchInput.value;
      console.log(searchTerm);
      searchKeyWord(searchTerm);
    },
    500,
    2000
  )
);

function throttledDebounce(func, delay, maxDelay) {
  let lastCall = 0;
  let timeoutId;

  return function (...args) {
    const now = new Date().getTime();
    // Throttle
    if (now - lastCall < maxDelay) {
      return;
    }
    lastCall = now;
    // Debounce
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function searchKeyWord(content) {
  let searchData = [];
  if (content != "") {
    for (let i = 0; i < Object.keys(allData).length; i++) {
      if (allData[i].name.includes(content)) {
        searchData.push(allData[i]);
      }
    }
  } else {
    searchData = allData;
  }
  let currentNumberPage = 1;
  changeStartPage();
  dataPage(currentNumberPage, searchData);
  if (Object.keys(searchData).length < configPage.pageSize) {
    onePage.style.display = "none";
    prevPage.style.display = "none";
    twoPage.style.display = "block";
    thirdPage.style.display = "none";
    nextPage.style.display = "none";
  }
  currentPage = 1;
  numberPage = Math.round(Object.keys(searchData).length / configPage.pageSize);
}

searchButton.addEventListener("click", async function () {
  const content = searchInput.value;
  searchKeyWord(content);
});

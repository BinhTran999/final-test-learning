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
const itemIdArr = [...document.querySelectorAll(".item .id")];
const shoppingItemList = document.getElementById("myBox");

const exitDetailItem = document.querySelector("#exitAItem");
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
const confirmBox = document.getElementById("item_confirm_box");
const exitConfirmBox = document.getElementById("exitConfirmBox");

const searchInput = document.querySelector("#search-text");
const searchButton = document.querySelector("#submit_search");

let CURRENT_PAGE = 1;

const divItems = [...document.querySelectorAll(".item")];
const itemImage = document.querySelector("#imageAItem");
const divItemsShopping = document.querySelector("#shopping");
const clickAdd = document.querySelector("#add-to-cart");
// let CacheData = {};
let cacheAr;
let allData;
let numberPage;
const CONFIG_PAGE = {
  PAGE_SIZE: 12,
  CURRENT_PAGE: 1,
};

let isItemDisplay = 0;
let deleteButtonItems = [];

function initNewArrItem(index) {
  return [
    itemNameArr[index].textContent,
    itemTypeArr[index].textContent,
    itemPriceArr[index].textContent,
      itemIdArr[index].textContent
  ];
}

divItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    let i = 0;
    shoppingItemList.style.display = "none";
    itemABox.style.display = "block";
    itemImage.style.backgroundImage = itemArr[index].style.backgroundImage;
    document.querySelector("#name-item").textContent =
        "Name : " + itemNameArr[index].textContent;
    document.querySelector("#description-item").textContent =
        "Description : " + itemDescriptionArr[index].textContent;
    document.querySelector("#price-item").textContent =
        "Price : " + itemPriceArr[index].textContent;
    cacheAr = initNewArrItem(index);
  });
});

itemABox.addEventListener("click", function (event) {
  event.stopPropagation();
});

document.addEventListener("click", function (event) {
  if (!itemABox.contains(event.target) && isItemDisplay !== 0) {
    isItemDisplay = 0;
    itemABox.style.display = "none";
  } else {
    isItemDisplay++;
  }
});

window.number_item = 300;


function saveItemToLocalStorage(cacheName, data) {
  localStorage.setItem(cacheName, JSON.stringify(data));
}


function getItemFromLocalStorage(cacheName) {
  const number = localStorage.getItem(cacheName);
  console.log(JSON.parse(number))
  return number ? JSON.parse(number) : 0;
}

clickAdd.addEventListener("click", (e) => {
  let currentValue = parseInt(sabanAcc.textContent);
  currentValue++;
  sabanAcc.textContent = currentValue.toString();
  saveItemToLocalStorage("numberItemData", currentValue);
  shoppingItemList.style.display = "none";
  cacheArrays.push(cacheAr);
  saveItemToLocalStorage("itemData", cacheArrays);
  console.log(cacheArrays)
});

sabanAcc.textContent = getItemFromLocalStorage("numberItemData").toString();


exitDetailItem.addEventListener("click", (e) => {
  itemABox.style.display = "none";
});

async function funcRequest(url,type="", number_page=0, searchName = "") {
  //true
  //i = 0
  createLoader(1700);
  const maxRetries = 10
  const retryDelay = 50
  for (let retries = 0; retries < maxRetries; retries++) {
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page:number_page, size:12, data: {
            name: searchName,
            type: type
          }
        })
      });
      if (!response.ok) {
        if (response.status === 500) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
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

let typeCache = ""

window.onload = async function () {
  console.log (cacheArrays)
  let resData = await funcRequest("http://10.63.161.172:3001/api/get-product");
  let data = resData.data.items
  numberPage =
      Math.round(resData.data.total / CONFIG_PAGE.PAGE_SIZE) + 1;
  await dataPage(data)
};

async function typeClick(aType) {
  typeCache = aType
  let resData = await funcRequest("http://10.63.161.172:3001/api/get-product", typeCache, 0);
  console.log(resData.data.items)
  CURRENT_PAGE = 1;
  changeStartPage();
  await dataPage(CURRENT_PAGE, aType);
  numberPage =
      Math.round(resData.data.total / CONFIG_PAGE.PAGE_SIZE) + 1;
  console.log(numberPage)
}

async function reactionType(t) {
  console.log(typeCache)
  if (typeCache === t) {
    typeCache = ""
    await typeClick("")
  } else {
    typeCache = t
  }
}

async function serviceClick() {
  await reactionType("service")
  await typeClick("service")
}

async function faciltitesClick() {
  await reactionType("facility")
  await typeClick("facility")
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

async function dataPage(CURRENT_PAGE, type="", keyword="") {
  t = typeCache
  console.log(t)
  let resData = await funcRequest("http://10.63.161.172:3001/api/get-product", t, CURRENT_PAGE-1, keyword);
  if (resData.data.total === 0) {
    for (let i = 0; i < CONFIG_PAGE.PAGE_SIZE; i++) {
      divItems[i].style.display = "none";
    }
    return;
  }
  let data = resData.data.items

  let n;
  const startIndex = (CURRENT_PAGE-1) * CONFIG_PAGE.PAGE_SIZE;
  for (let i = 0; i < CONFIG_PAGE.PAGE_SIZE; i++) {
    let bimg = "url('" + data[i].image + "')";
    itemArr[i].style.backgroundImage = bimg;
    itemArr[i].style.backgroundSize = "100% 100%";
    itemNameArr[i].innerHTML = data[i].name;
    itemPriceArr[i].innerHTML = data[i].price + " VND";
    itemDescriptionArr[i].innerHTML = data[i].description;
    itemTypeArr[i].innerHTML = data[i].type;
    itemIdArr[i].innerHTML = data[i].id;
    n = startIndex + i + 1;
    if (i + startIndex === resData.data.total - 1) {
      break;
    }
  }

  if (n === resData.data.total) {
    for (let i = n % 12; i < CONFIG_PAGE.PAGE_SIZE; i++) {
      divItems[i].style.display = "none";
    }
  } else {
    for (let i = 0; i < CONFIG_PAGE.PAGE_SIZE; i++) {
      divItems[i].style.display = "block";
    }
  }
}

thirdPage.addEventListener("click", async (e) => {
  if (CURRENT_PAGE === 1) {
    onePage.style.display = "block";
    prevPage.style.display = "block";
  }

  if (CURRENT_PAGE === numberPage - 1) {
    thirdPage.style.display = "none";
    nextPage.style.display = "none";
  }
  CURRENT_PAGE++;
  onePage.textContent = CURRENT_PAGE - 1;
  twoPage.textContent = CURRENT_PAGE;
  thirdPage.textContent = CURRENT_PAGE + 1;
  await dataPage(CURRENT_PAGE, typeCache);
});

nextPage.addEventListener("click", async (e) => {
  if (CURRENT_PAGE === 1) {
    onePage.style.display = "block";
    prevPage.style.display = "block";
  }

  if (CURRENT_PAGE === numberPage - 1) {
    thirdPage.style.display = "none";
    nextPage.style.display = "none";
  }
  CURRENT_PAGE++;
  onePage.textContent = CURRENT_PAGE - 1;
  twoPage.textContent = CURRENT_PAGE;
  thirdPage.textContent = CURRENT_PAGE + 1;
  await dataPage(CURRENT_PAGE, typeCache);
});

onePage.addEventListener("click", async (e) => {
  if (CURRENT_PAGE === 2) {
    onePage.style.display = "none";
    prevPage.style.display = "none";
  }

  if (CURRENT_PAGE === numberPage) {
    thirdPage.style.display = "block";
    nextPage.style.display = "block";
  }
  CURRENT_PAGE--;
  onePage.textContent = CURRENT_PAGE - 1;
  twoPage.textContent = CURRENT_PAGE;
  thirdPage.textContent = CURRENT_PAGE + 1;
  await dataPage(CURRENT_PAGE, typeCache);
});

prevPage.addEventListener("click", async (e) => {
  if (CURRENT_PAGE === 2) {
    onePage.style.display = "none";
    prevPage.style.display = "none";
  }

  if (CURRENT_PAGE === numberPage) {
    thirdPage.style.display = "block";
    nextPage.style.display = "block";
  }
  CURRENT_PAGE--;
  onePage.textContent = CURRENT_PAGE - 1;
  twoPage.textContent = CURRENT_PAGE;
  thirdPage.textContent = CURRENT_PAGE + 1;
  await dataPage(CURRENT_PAGE, typeCache);
});

function ArrToDic(data) {
  let frequencyDict = {};
  for (let item of data) {
    console.log(item)
    if (frequencyDict[item[0]]) {
      frequencyDict[item[0]].quantity += 1;
    } else {
      let v;
      if (item[4] === undefined) {
        v = 1;
      } else {
        v = item[4]
      }
      frequencyDict[item[0]] = {
        name: item[0],
        type: item[1],
        price: item[2],
        quantity: v,
        id: item[3]

      };
    }
  }
  return frequencyDict;
}

const listShopItem = document.querySelector(".list_shop_item");
let cacheArrays = getItemFromLocalStorage("itemData")

divItemsShopping.addEventListener("click", (e) => {
  console.log(cacheArrays)
  const tableToRemove = listShopItem.querySelector("table");

  if (shoppingItemList.style.display === "none") {

    const itemDic = ArrToDic(cacheArrays);

    cacheArrays = []
    for (let item in itemDic) {
      let elementArr = [itemDic[item].name, itemDic[item].type, itemDic[item].price, itemDic[item].id, itemDic[item].quantity]
      cacheArrays.push(elementArr)
    }
    saveItemToLocalStorage("itemData", cacheArrays)
    shoppingItemList.style.display = "block";
    let table = createTable2(itemDic);
    listShopItem.appendChild(table);
    let totalPrice = 0;
    console.log(itemDic)
    for (let item in itemDic) {
      console.log(itemDic[item].price.slice(0, -4))
      let amountWithoutSuffix = itemDic[item].price.slice(0, -4);
      let amountNumber = parseInt(amountWithoutSuffix);
      let numberOfItem = parseInt(itemDic[item].quantity);
      totalPrice += amountNumber * numberOfItem;
    }
    document.querySelector("#amount").textContent = totalPrice + " VND"
    let allDeleteButtons = listShopItem.querySelectorAll(".delete_item")
    allDeleteButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        let nameElement = row.querySelector(".name_item").textContent.split("(")[0]
        const count = parseInt(itemDic[nameElement].quantity);

        document.querySelector("#amount").textContent = (totalPrice - parseInt(itemDic[nameElement].price.slice(0, -4))*count ).toString() + " VND"
        if (listShopItem.getElementsByTagName("table")[0].rows.length === 1) {
          cacheArrays = []
          sabanAcc.textContent = "0";
          shoppingItemList.style.display = "none";
          listShopItem.removeChild(table);
        } else {
          delete itemDic[nameElement];
          cacheArrays = cacheArrays.filter(function (item) {
            return item[0] !== nameElement;
          });
          let currentValue = parseInt(sabanAcc.textContent) - count;
          sabanAcc.textContent = currentValue.toString()
        }
        saveItemToLocalStorage("numberItemData", sabanAcc.textContent)
        saveItemToLocalStorage("itemData", cacheArrays)
        row.remove();

      });
    });
  } else {
    shoppingItemList.style.display = "none";
  }
  tableToRemove.remove();
});

function createTable2(dict) {
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.border = "1px solid black";
  for (let item in dict) {
    let dictElement = dict[item]
    console.log(dictElement)
    const row = document.createElement("tr");
    row.style.border = "1px solid black";
    for (let j = 0; j < Object.keys(dictElement).length; j++) {
      if (j === 0) {
        const cell = document.createElement("td");
        cell.className = "name_item"
        cell.style.border = "1px solid black";
        cell.textContent = dictElement.name + "(x" + dictElement.quantity + ")";
        row.appendChild(cell);
        cell.style.width = "150px";
        cell.style.height = "20px";
      }
      if (j === 1) {
        const cell = document.createElement("td");
        cell.style.border = "1px solid black";
        cell.textContent =
            parseInt(dictElement.price) * parseInt(dictElement.quantity) + " VND";
        row.appendChild(cell);
        cell.style.width = "150px";
        cell.style.height = "20px";
      }
      if (j === 2) {
        const cell = document.createElement("button");
        // cell.rowIndex = i;
        cell.className = "delete_item"
        row.appendChild(cell);
        cell.textContent = "delete";
        cell.style.backgroundColor = "black";
        cell.style.background = "white";
        cell.style.width = "100px";
        deleteButtonItems.push(cell);
      }
    }
    table.appendChild(row)
  }
  return table
}

let deleteItems = document.querySelectorAll(".table_item .delete_item");
deleteItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    console.log(index)
  });
});
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

changeToSuccessScreen.addEventListener("click", async (e) => {
  createLoader(5000);
  cacheArrays = getItemFromLocalStorage("itemData")
  let approvalArr = []
  for (let item in cacheArrays) {
    approvalArr.push({
      "productId": cacheArrays[item][3],
      "productName": cacheArrays[item][0],
      "quanlity": parseInt(cacheArrays[item][4]),
      "price": parseInt(cacheArrays[item][2].slice(0, -4))
    })

  }
  let dataApproval = await funcApproval("http://10.63.161.172:3001/api/insert-order", approvalArr)
  saveItemToLocalStorage("orderID", dataApproval.items[0].orderId)
  setTimeout(function () {
    window.location.href = "order-detal.html";
  }, 5000);
});

searchInput.addEventListener(
    "input",
    throttledDebounce(
        () => {
          const searchTerm = searchInput.value;
          CURRENT_PAGE = 1;
          searchKeyWord(searchTerm);
        },
        500,
        501
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

async function searchKeyWord(content) {
  let searching = await funcRequest("http://10.63.161.172:3001/api/get-product", "", 0, content)
  let CURRENT_PAGE = 1;
  changeStartPage();
  await dataPage(CURRENT_PAGE, "", content);
  if (searching.data.total  === 0) {
    onePage.style.display = "none";
    prevPage.style.display = "none";
    twoPage.style.display = "none";
    thirdPage.style.display = "none";
    nextPage.style.display = "none";
  }

  if (searching.data.total < CONFIG_PAGE.PAGE_SIZE) {
    onePage.style.display = "none";
    prevPage.style.display = "none";
    twoPage.style.display = "block";
    thirdPage.style.display = "none";
    nextPage.style.display = "none";
  }
  numberPage = Math.round(
      searching.data.total / CONFIG_PAGE.PAGE_SIZE
  );
  CURRENT_PAGE = 1;
}

searchButton.addEventListener("click", async function () {
  const content = searchInput.value;
  await searchKeyWord(content);
});

function createLoader(duration = 2000) {
  const container = document.createElement("div");
  container.classList.add("container");
  const loader = document.createElement("div");
  loader.classList.add("loader");
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("div");
    dot.classList.add("loader--dot");
    loader.appendChild(dot);
  }
  const loadingText = document.createElement("div");
  loadingText.classList.add("loader--text");
  loader.appendChild(loadingText);
  container.appendChild(loader);
  document.body.appendChild(container);
  setTimeout(() => {
    container.remove();
  }, duration);
}

async function funcApproval(url, itemsArr = []) {
  //true
  //i = 0
  createLoader(1701);
  const maxRetriesApproval = 10
  const retryDelayApproval = 50
  for (let retries = 0; retries < maxRetriesApproval; retries++) {
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "items": [
            {
              "products": itemsArr
            }
          ]
        })
      });
      if (!response.ok) {
        if (response.status === 500) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayApproval));
          continue;
        }
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      if (error.message === "HTTP error 500") {
        await new Promise((resolve) => setTimeout(resolve, retryDelayApproval));
        continue;
      }
      if (retries === maxRetriesApproval - 1) {
        throw error;
      }
    }
  }

}

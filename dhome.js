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
let cacheArrays = [];
var cacheAr = null;
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
    ];
}

divItems.forEach((item, index) => {
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


function saveItemToLocalStorage(cacheName, data) {
    localStorage.setItem(cacheName, JSON.stringify(data));
}


function getItemFromLocalStorage(cacheName) {
    const number = localStorage.getItem(cacheName);
    return number ? parseInt(JSON.parse(number)) : 0;
}

clickAdd.addEventListener("click", (e) => {
    let currentValue = parseInt(sabanAcc.textContent);
    currentValue++;
    sabanAcc.textContent = currentValue.toString();
    saveItemToLocalStorage("numberItemData", currentValue);
    shoppingItemList.style.display = "none";
    cacheArrays.push(cacheAr);
    saveItemToLocalStorage(cacheArrays);
});

sabanAcc.textContent = getItemFromLocalStorage("numberItemData");
cacheArrays = getItemFromLocalStorage("itemData");

exitDetailItem.addEventListener("click", (e) => {
    itemSopBox.style.display = "none";
});

async function funcRequest(url,type="", number_page=0) {
    //true
    //i = 0
    const maxRetries = 10
    const retryDelay = 5
    for (let retries = 0; retries < maxRetries; retries++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page:number_page, size:12, data: {
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

let typeCache = ""

window.onload = async function () {
    let resData = await funcRequest("http://10.63.161.172:3001/api/get-product");
    let data = resData.data.items
    numberPage =
        Math.round(resData.data.total / CONFIG_PAGE.PAGE_SIZE) + 1;
    dataPage(data)
};

async function typeClick(aType) {
    typeCache = aType
    let resData = await funcRequest("http://10.63.161.172:3001/api/get-product", typeCache, 0);
    CURRENT_PAGE = 1;
    changeStartPage();
    await dataPage(CURRENT_PAGE, aType);
    numberPage =
        Math.round(resData.data.total / CONFIG_PAGE.PAGE_SIZE) + 1;
    console.log(numberPage)
}

function reactionType(t) {
    console.log(typeCache)
    if (typeCache === t) {
        typeCache = ""
        typeClick("")
    } else {
        typeCache = t
    }
}

async function serviceClick() {
    reactionType("service")
    typeClick("service")
}

async function faciltitesClick() {
    reactionType("facility")
    typeClick("facility")
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

async function dataPage(CURRENT_PAGE, type="") {
    t = typeCache
    console.log(t)
    let resData = await funcRequest("http://10.63.161.172:3001/api/get-product", t, CURRENT_PAGE-1);
    console.log(resData.data.total)
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
        n = startIndex + i + 1;
        if (i + startIndex === resData.data.total - 1) {
            console.log("AAAAAAAAAAAAAAAAAAAAA")
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
    console.log(CURRENT_PAGE)
    console.log(numberPage)
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
    console.log(CURRENT_PAGE)
    console.log(numberPage)
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
    console.log(CURRENT_PAGE)
    console.log(numberPage)
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
    console.log(CURRENT_PAGE)
    console.log(numberPage)
    await dataPage(CURRENT_PAGE, typeCache);
});

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

const listShopItem = document.querySelector(".list_shop_item");

divItemsShopping.addEventListener("click", (e) => {
    const tableToRemove = listShopItem.querySelector("table");
    const itemDic = ArrToDic(cacheArrays);
    if (shoppingItemList.style.display === "none") {
        shoppingItemList.style.display = "block";
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
        console.log(cacheArrays);
        amountAllItemShop.textContent = totalPrice + " VND";
        const rows = listShopItem.getElementsByTagName("tr");
        deleteButtonItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                let startTime = performance.now();
                console.log(index);
                if (listShopItem.getElementsByTagName("table")[0].rows.length === 1) {
                    listShopItem.removeChild(table);
                    cacheArrays = [];
                    shoppingItemList.style.display = "none";
                    deleteButtonItems = [];
                    let currentValue = parseInt(sabanAcc.textContent);
                    currentValue = 0;
                    number_item = currentValue;
                    sabanAcc.textContent = currentValue;
                    saveItemToLocalStorage([]);
                    saveItemFromLocalStorage(0);
                } else {
                    listShopItem.getElementsByTagName("table")[0].deleteRow(index);
                    const deleteItemName = cacheArrays[index][0];
                    const newcacheArrays = cacheArrays.filter(function (item) {
                        return item[0] != deleteItemName;
                    });
                    cacheArrays = newcacheArrays;
                    deleteButtonItems.splice(index, 1);
                    arr.splice(index, 1);
                    let currentValue = parseInt(sabanAcc.textContent);
                    currentValue -= itemDic[deleteItemName].quanlity;
                    number_item = currentValue;
                    sabanAcc.textContent = currentValue;
                    saveItemToLocalStorage(arr);
                    saveItemFromLocalStorage(currentValue);
                }
                let endTime = performance.now();
                console.log(endTime - startTime);
            });
        });
    } else {
        deleteButtonItems = [];
        shoppingItemList.style.display = "none";
    }
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
    createLoader(5000);
    setTimeout(function () {
        window.location.href = "order-detal.html";
    }, 5000);
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
    let CURRENT_PAGE = 1;
    changeStartPage();
    dataPage(CURRENT_PAGE, searchData);
    if (Object.keys(searchData).length < CONFIG_PAGE.PAGE_SIZE) {
        onePage.style.display = "none";
        prevPage.style.display = "none";
        twoPage.style.display = "block";
        thirdPage.style.display = "none";
        nextPage.style.display = "none";
    }
    CURRENT_PAGE = 1;
    numberPage = Math.round(
        Object.keys(searchData).length / CONFIG_PAGE.PAGE_SIZE
    );
}

searchButton.addEventListener("click", async function () {
    const content = searchInput.value;
    searchKeyWord(content);
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

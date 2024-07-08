const listDetail = document.querySelector("#choose-search-list-detail");
const serialCode = document.querySelector("#serial-code");
const detailBox = document.querySelector("#resultBox");
const orderNumber = document.querySelector("#choose-search-list-detail p2");
const total = document.querySelector(".grid-items p3");

async function funcRequest(url, maxRetries = 20, retryDelay = 5) {
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

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumberItemFromLocalStorage() {
  const number = localStorage.getItem("numberItemData");
  return number ? parseInt(JSON.parse(number)) : 0;
}

numberItem = getNumberItemFromLocalStorage();

console.log(numberItem);

//
async function getEnermyData(url) {
  allData = [];
  const data = await funcRequest(url);

  for (
    let i = 0;
    i < data.data.total / Object.keys(data.data.items).length + 1;
    i++
  ) {
    const url_i = url + "?page=" + i;
    data_i = await funcRequest(url_i);
    allData.push(...data_i.data.items);
  }
  return allData;
}

window.onload = async function () {
  const data = await getEnermyData("http://10.63.161.172:3001/api/get-order");
  const allData = await getEnermyData(
    "http://10.63.161.172:3001/api/get-product"
  );
  let dataDic = {};
  for (d in allData) {
    dataDic[allData[d].id] = allData[d];
  }
  let numberEmement = 0;
  let orderElement = undefined;
  while (orderElement === undefined) {
    console.log(data[numberEmement]);
    numberEmement = getRandomNumber(0, Object.keys(data).length);
    orderElement = data[numberEmement].products;
  }
  orderNumber.textContent = "Order number: " + data[numberEmement].orderId;
  let resultOrder = {};
  let totalPrice = 0;
  for (let i = 0; i < Object.keys(data[numberEmement].products).length; i++) {
    let elementPrice = orderElement[i].price;
    console.log(typeof elementPrice);
    if (typeof elementPrice === "string") {
      elementPrice = parseInt(orderElement[i].price.replace("$", ""));
    }
    let item = new Array(4);
    console.log(orderElement);
    // Product
    // item[0] = orderElement[i].productName;
    let elementId = "";
    console.log(orderElement[i].quanlity);
    console.log(orderElement[i].quantity);
    let elementQuantity =
      orderElement[i].quanlity === undefined
        ? orderElement[i].quantity
        : orderElement[i].quanlity;
    if (orderElement[i].productId != undefined) {
      elementId = orderElement[i].productId;
    } else if (orderElement[i].id != undefined) {
      elementId = orderElement[i].id;
    } else {
      elementId = "test";
    }
    if (elementId != "test") {
      item[0] = dataDic[elementId].name;
      item[1] = dataDic[elementId].type;
    } else {
      item[0] = "test" + i;
      item[1] = "test";
    }
    item[2] = elementQuantity;
    item[3] = parseInt(elementQuantity) * elementPrice;
    totalPrice += parseInt(elementQuantity) * elementPrice;
    resultOrder[item[0]] = item;
  }
  for (const key in resultOrder) {
    console.log(resultOrder[key]);
  }
  let table = createTable(resultOrder);
  detailBox.appendChild(table);
  total.textContent = "Total price: " + totalPrice + " VND";
};

function createTable(dict) {
  console.log(dict);
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.border = "1px solid black";
  const rowFirst = document.createElement("tr");
  rowFirst.style.border = "1px solid black";
  for (let j = 0; j < 4; j++) {
    const cellFirst = document.createElement("td");
    if (j === 0) {
      cellFirst.textContent = "Products";
      cellFirst.style.border = "1px solid black";
      cellFirst.style.width = "375px";
      cellFirst.style.height = "40px";
    }
    if (j === 1) {
      cellFirst.textContent = "Type";
      cellFirst.style.border = "1px solid black";
      cellFirst.style.width = "175px";
      cellFirst.style.height = "40px";
    }
    if (j === 2) {
      cellFirst.textContent = "Quanlity";
      cellFirst.style.border = "1px solid black";
      cellFirst.style.width = "175px";
      cellFirst.style.height = "40px";
    }
    if (j === 3) {
      cellFirst.textContent = "Price";
      cellFirst.style.border = "1px solid black";
      cellFirst.style.width = "175px";
      cellFirst.style.height = "40px";
    }

    rowFirst.appendChild(cellFirst);
  }
  table.appendChild(rowFirst);
  let isRow = 0;
  for (const key in dict) {
    const row = document.createElement("tr");
    row.style.border = "1px solid black";

    for (let j = 0; j < 4; j++) {
      const cell = document.createElement("td");
      if (j === 0) {
        cell.textContent = dict[key][0];
      }
      if (j === 1) {
        cell.textContent = dict[key][1];
      }
      if (j === 2) {
        cell.textContent = dict[key][2];
      }
      if (j === 3) {
        cell.textContent = dict[key][3];
      }
      cell.style.border = "1px solid black";
      cell.style.width = "175px";
      cell.style.height = "40px";
      row.appendChild(cell);
      isRow = 1;
    }

    table.appendChild(row);
  }
  return table;
}

const saban_acc = document.querySelector("#number_market");
const services_type_click = document.getElementById("services-product-type");
const facilities_type_click = document.getElementById(
  "facilities-product-type"
);
const itemArr = [...document.querySelectorAll(".item .img-html")];
const itemNameArr = [...document.querySelectorAll(".item .text-content")];
const itemPriceArr = [...document.querySelectorAll(".item .price")];
const shoppingItemList = document.getElementById("myBox");

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

async function listItem() {
  console.log(Object.keys(shoppingItemList.style.display).length);
  console.log(shoppingItemList.style.display);
  document.getElementById("shopping").addEventListener("click", function () {
    if (shoppingItemList.style.display === "none") {
      shoppingItemList.style.display = "block";
    } else if (shoppingItemList.style.display === "block") {
      shoppingItemList.style.display = "none";
    }
  });
}

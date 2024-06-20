const saban_acc = document.querySelector("#number_market");
const services_type_click = document.getElementById("services-product-type");
const facilities_type_click = document.getElementById(
  "facilities-product-type"
);
const itemArr = [...document.querySelectorAll(".item .img-html")];
const itemNameArr = [...document.querySelectorAll(".item .text-content")];
const itemPriceArr = [...document.querySelectorAll(".item .price")];
const itemArrEmpty = [...document.querySelectorAll(".item .img-html")];
const itemNameArrEmpty = [...document.querySelectorAll(".item .text-content")];
const itemPriceArrEmpty = [...document.querySelectorAll(".item .price")];
const shoppingItemList = document.getElementById("myBox");

console.log(itemNameArr);

function get_data(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((webData) => log(webData))
    .catch((error) => {
      console.error("Lỗi:", error);
    });
}

async function getEnermyData() {
  return await get_data("http://10.63.161.172:3001/api/get-product");
}

async function fetchData() {
  let newData = ``;
  try {
    let data = await getEnermyData();
    while (data.code != 200) {
      data = await getEnermyData();
    }
    newData = data;
    console.log(newData);
    console.log(Object.keys(newData.data.items).length);
  } catch (error) {
    console.error("Lỗi:", error);
  }
  let services = {};
  let facilities = {};
  let newArray_services = new Array();
  let newArray_facilities = new Array();
  services.data = newArray_services;
  facilities.data = newArray_facilities;
  for (let i = 0; i < Object.keys(newData.data.items).length; i++) {
    if (newData.data.items[i].type === "service") {
      services.data.push(newData.data.items[i]);
    } else if (newData.data.items[i].type === "facility") {
      facilities.data.push(newData.data.items[i]);
    }
    console.log(newData.data.items[i].name);
  }
  return [newData, services, facilities];
}

async function serviceClick() {
  console.log("111");
  let [newData, services, facilities] = await fetchData();
  for (let i = 0; i < Object.keys(services.data).length; i++) {
    let bimg = "url('" + services.data[i].image + "')";
    itemArr[i].style.backgroundImage = bimg;
    itemArr[i].style.backgroundSize = "100% 100%";
    itemNameArr[i].innerHTML = services.data[i].name;
    itemPriceArr[i].innerHTML = services.data[i].price + " VND";
  }
}

async function faciltitesClick() {
  console.log("111");
  let [newData, services, facilities] = await fetchData();
  for (let i = 0; i < Object.keys(facilities.data).length; i++) {
    let bimg = "url('" + facilities.data[i].image + "')";
    itemArr[i].style.backgroundImage = bimg;
    itemArr[i].style.backgroundSize = "100% 100%";
    itemNameArr[i].innerHTML = facilities.data[i].name;
    itemPriceArr[i].innerHTML = facilities.data[i].price + " VND";
  }
}

function listItem() {
  document.getElementById("shopping").addEventListener("click", function () {
    console.log(shoppingItemList.style.display);
    // document.getElementById("myBox").style.display = "none";
    if (shoppingItemList.style.display === "none") {
      shoppingItemList.style.display = "block";
    } else {
      shoppingItemList.style.display = "none";
    }
  });
}

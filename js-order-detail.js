const listDetail = document.querySelector("#choose-search-list-detail");
const serialCode = document.querySelector("#serial-code");
const detailBox = document.querySelector("#resultBox");

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
  const data = await funcRequest("http://10.63.161.172:3001/api/get-order");
  console.log(data.data.items[6].products);
  const table = createTable(data.data.items[6].products);
  serialCode.textContent = data.data.items[1].orderId;
  resultBox.appendChild(table);
};

function createTable(arr) {
  console.log(arr);
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.border = "1px solid black";
  for (let i = 0; i < Object.keys(arr).length; i++) {
    const row = document.createElement("tr");
    row.style.border = "1px solid black";

    for (let j = 0; j < 4; j++) {
      const cell = document.createElement("td");
      if (j == 0) {
        cell.textContent = arr[i].productId;
      }
      if (j == 0) {
        cell.textContent = arr[i].productId;
      }
      if (j == 0) {
        cell.textContent = arr[i].productId;
      }
      if (j == 0) {
        cell.textContent = arr[i].productId;
      }
      cell.style.border = "1px solid black";
      cell.style.width = "175px";
      cell.style.height = "40px";
      row.appendChild(cell);
    }

    table.appendChild(row);
  }
  return table;
}

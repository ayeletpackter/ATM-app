import axios from "./node_modules/@bundled-es-modules/axios/axios.js";
import { DataTable } from "./node_modules/simple-datatables/dist/module/index.js";
console.log(DataTable);
const response = axios
  .get("https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26&limit=10")
  .then((response) => {
    response.data;
    console.log(response);
    createTableHead(response.data.result.fields);
    createTableBody(response.data.result.records);
    const dataTable = new DataTable(myTable);
  })
  .catch((err) => console.log(err));

const myTable = document.querySelector("#myTable");
let theadEl = document.createElement("thead");
let tBodyEl = document.createElement("tbody");

const createTableHead = (data) => {
  console.log(data);
  let trEl = document.createElement("tr");
  for (let index = 0; index < data.length; index++) {
    let thEl = document.createElement("th");
    thEl.innerText = data[index].id;
    trEl.appendChild(thEl);
  }
  theadEl.appendChild(trEl);
  myTable.appendChild(theadEl);
};

const createTableBody = (data) => {
  console.log(data);
  for (const iterator of data) {
    let trEl = document.createElement("tr");
    for (const key in iterator) {
      let tdEl = document.createElement("td");
      tdEl.innerText = iterator[key];
      trEl.appendChild(tdEl);
    }
    tBodyEl.appendChild(trEl);
    myTable.appendChild(tBodyEl);
  }
};

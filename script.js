import axios from "./node_modules/@bundled-es-modules/axios/axios.js";
import { DataTable } from "./node_modules/simple-datatables/dist/module/index.js";
const response = axios
  .get("https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26&limit=500")
  .then((response) => {
    createTableHead(response.data.result.fields);
    createTableBody(response.data.result.records);
    const dataTable = new DataTable(myTable);
    google.maps.event.addDomListener(window, "load", createGoogleMap(response.data.result.records));
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
function createGoogleMap(data) {
  for (let i = 0; i < data.length; i++) {
    init_map(data[i]);
  }
}
let selectorMapElement = document.querySelector("#gmap_canvas");
const myOptions = {
  zoom: 8,
  center: new google.maps.LatLng(31.4037192, 33.9606743),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};
let map = new google.maps.Map(selectorMapElement, myOptions);
function init_map(dataATMObject) {
  let googleMapTitle = `ATM ${dataATMObject.ATM_Address}`;
  let googleMapAddress = `${dataATMObject.ATM_Address}, ${dataATMObject.City}`;
  let googleMapLat = dataATMObject.Y_Coordinate;
  let googleMapLong = dataATMObject.X_Coordinate;
  let infowindow = new google.maps.InfoWindow({
    content: `
          <strong>${googleMapTitle}</strong>
          <br>${googleMapAddress}<br>
        `,
  });
  let marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(googleMapLat, googleMapLong),
  });
  google.maps.event.addListener(marker, "click", function () {
    infowindow.open(map, marker);
  });
}
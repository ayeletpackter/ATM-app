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




function init_map() {
  let selectorMapElement = document.querySelector('#gmap_canvas');
  let googleMapTitle = "ATM 1";
  let googleMapAddress ="disingov 31 Tel-Aviv";
  let googleMapLat = 31.4037193;
  let googleMapLong = 33.9606947;
  
  const myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(googleMapLat, googleMapLong),
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  let infowindow = new google.maps.InfoWindow({
      content: `
        <strong>${googleMapTitle}</strong>
        <br>${googleMapAddress}<br>
      `
  });
  
  let map = new google.maps
    .Map(selectorMapElement, myOptions);
  
    let marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(31.665121, 34.585473)
  });

 let marker2 = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(38.2847678, -122.9536827)
  });
  
  

  google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
  });

  google.maps.event.addListener(marker2, 'click', function() {
    infowindow.open(map, marker2);
});
}

google.maps.event.addDomListener(window, 'load', init_map);

function displayListingMap(containerId, coords, title) {
  const map = L.map(containerId).setView(coords, 10);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  L.marker(coords)
    .addTo(map)
    .bindPopup(title)
    .openPopup();
}



// const map = L.map('map');
// map.setView([28.6139, 77.2090], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// maxZoom: 19,
// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// navigator.geolocation.watchPosition(success, error);


// function success(pos) {
//     const lat =pos.coords.latitude;
//     const lng = pos.coords.longitude;
//     const  accuracy =pos.coords.accuracy;

//    if(marker){
//     map.removeLayer(marker);
//     map.removeLayer(circle);
//    }
//     const marker = L.marker([lat, lng]).addTo(map);
//     const circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

//     if(!)
//     map.fitBounds(circle.getBounds());
// }
// function error(err){
//     if(err.code === 1){
//         alert("please allow geolocation access");

//     }else{
//         alert("can not get current location");
//     }

// }
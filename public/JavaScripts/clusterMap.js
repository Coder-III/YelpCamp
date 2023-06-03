const map = L.map('cluster-map', {
    center: [37.0902, -95.7129],
    zoom: 4
  });

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

const markers = L.markerClusterGroup();

for (i = 0; i < campgrounds.length; i++) {
    const campLat = campgrounds[i].geometry.coordinates[1];
    const campLng = campgrounds[i].geometry.coordinates[0];
    const marker = L.marker(new L.LatLng(campLat, campLng));
    marker.bindPopup(`<a href="/campgrounds/${campgrounds[i]._id}"><b>${campgrounds[i].title}</b></a>
      <p>${campgrounds[i].location}</p>`);
    markers.addLayer(marker);
}
map.addLayer(markers);

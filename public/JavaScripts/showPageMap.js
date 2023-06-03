

campGeo();

async function campGeo() {
  const response = await fetch(`https://geocode.maps.co/search?q=${campground.location}`)
  console.log(response);
  const data = await response.json();
  console.log(data);
  const location = data[0];
  console.log(location);
  const center = [location.lat, location.lon];
  console.log(center);


const map = L.map('map', {
    center: center,
    zoom: 10
});
const marker = L.marker(center).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}

// (function () {
//   const lat = 20;
//   const lng = -103;
//   const mapa = L.map("map").setView([lat, lng], 13);

//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 19,
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//   }).addTo(mapa);
// })();

(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const mapa = L.map("map").setView([lat, lng], 16);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(mapa);
      },
      function (error) {
        console.error(error);
      }
    );
  }
})();

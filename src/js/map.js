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
        const lat = document.querySelector("#lat").value || pos.coords.latitude;
        const lng =
          document.querySelector("#lng").value || pos.coords.longitude;
        const mapa = L.map("map").setView([lat, lng], 16);
        let marker;

        // use provider and geocoder
        const geocodeService = L.esri.Geocoding.geocodeService();

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(mapa);

        marker = new L.marker([lat, lng], {
          draggable: true,
          autoPan: true,
        }).addTo(mapa);

        // detect marker movement
        marker.on("moveend", function (e) {
          marker = e.target;
          const pos = marker.getLatLng();

          mapa.panTo(new L.LatLng(pos.lat, pos.lng));

          // obtainer street name from lat and lng
          geocodeService
            .reverse()
            .latlng(pos, 16)
            .run(function (err, res) {
              console.log(res);

              marker.bindPopup(res.address.LongLabel);

              // fill fields
              document.querySelector(".street").textContent = res
                ? res.address.Address
                : "Address not found";
              document.querySelector("#street").value = res.address.Address;
              document.querySelector("#lat").value = res.latlng.lat;
              document.querySelector("#lng").value = res.latlng.lng;
            });
        });
      },
      function (error) {
        console.error(error);
      }
    );
  }
})();

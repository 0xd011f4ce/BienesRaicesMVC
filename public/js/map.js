/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// (function () {\n//   const lat = 20;\n//   const lng = -103;\n//   const mapa = L.map(\"map\").setView([lat, lng], 13);\n\n//   L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n//     maxZoom: 19,\n//     attribution:\n//       'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors',\n//   }).addTo(mapa);\n// })();\n\n(function () {\n  if (navigator.geolocation) {\n    navigator.geolocation.getCurrentPosition(\n      async function (pos) {\n        const lat = pos.coords.latitude;\n        const lng = pos.coords.longitude;\n        const mapa = L.map(\"map\").setView([lat, lng], 16);\n        let marker;\n\n        // use provider and geocoder\n        const geocodeService = L.esri.Geocoding.geocodeService();\n\n        L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n          maxZoom: 19,\n          attribution:\n            'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors',\n        }).addTo(mapa);\n\n        marker = new L.marker([lat, lng], {\n          draggable: true,\n          autoPan: true,\n        }).addTo(mapa);\n\n        // detect marker movement\n        marker.on(\"moveend\", function (e) {\n          marker = e.target;\n          const pos = marker.getLatLng();\n\n          mapa.panTo(new L.LatLng(pos.lat, pos.lng));\n\n          // obtainer street name from lat and lng\n          geocodeService\n            .reverse()\n            .latlng(pos, 16)\n            .run(function (err, res) {\n              console.log(res);\n\n              marker.bindPopup(res.address.LongLabel);\n\n              // fill fields\n              document.querySelector(\".street\").textContent = res\n                ? res.address.Address\n                : \"Address not found\";\n              document.querySelector(\"#street\").value = res.address.Address;\n              document.querySelector(\"#lat\").value = res.latlng.lat;\n              document.querySelector(\"#lng\").value = res.latlng.lng;\n            });\n        });\n      },\n      function (error) {\n        console.error(error);\n      }\n    );\n  }\n})();\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
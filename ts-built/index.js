"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// definition of constants, including paths and keys
var basicWeatherPath = "https://api.openweathermap.org/data/2.5/weather";
var basicGeoPath = "http://api.openweathermap.org/geo/1.0/direct";
var flagPath = "https://openweathermap.org/images/flags";
var apiKey = "ae924b2ed8a85e1cbd910e9a5d67f925";
//search of place by input field, display a small list of 3 items, once an option its choosen it clean the list
var searchPlace = function () { return __awaiter(void 0, void 0, void 0, function () {
    var name, listPlaces, geolocationPath, places;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = document.getElementById('name');
                listPlaces = document.getElementById('listPlaces');
                // clean list places in case that is already filled
                document.getElementById('listPlaces').innerHTML = "";
                geolocationPath = "".concat(basicGeoPath, "?q=").concat(name.value, "&limit=3&appid=").concat(apiKey);
                places = undefined;
                return [4 /*yield*/, fetch(geolocationPath).then(function (response) { return response.json(); })
                    //in case that places has content, we append the names and the flag to the html element
                ];
            case 1:
                places = _a.sent();
                //in case that places has content, we append the names and the flag to the html element
                if (places) {
                    places.forEach(function (element) {
                        var paragraph = document.createElement("p");
                        var flag = document.createElement("img");
                        paragraph.setAttribute("class", "place");
                        paragraph.setAttribute("onclick", "searchWeather(".concat(element.lat, ",").concat(element.lon, ")"));
                        flag.setAttribute("src", "".concat(flagPath, "/").concat(element.country.toLowerCase(), ".png"));
                        flag.setAttribute("class", "flag");
                        paragraph.innerHTML = "".concat(element.name, " ").concat(element.country);
                        paragraph.appendChild(flag);
                        listPlaces.append(paragraph);
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
// search of weathe by lat and lon
var searchWeather = function (lat, lon) { return __awaiter(void 0, void 0, void 0, function () {
    var weatherLocationPath, displayWeather, weather;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                weatherLocationPath = "".concat(basicWeatherPath, "?lat=").concat(lat, "&lon=").concat(lon, "&appid=").concat(apiKey, "&units=metric");
                displayWeather = document.getElementById('displayWeather');
                return [4 /*yield*/, fetch(weatherLocationPath)
                        .then(function (response) { return response.json(); })];
            case 1:
                weather = _h.sent();
                if (weather) {
                    //display weather div in case that weather is not null
                    displayWeather.classList.remove("hiddenWeather");
                    //remove list of places
                    document.getElementById('listPlaces').innerHTML = "";
                    //replaces values in every paragraph by id
                    document.getElementById('weatherName').innerHTML = (weather === null || weather === void 0 ? void 0 : weather.name) || "No info";
                    document.getElementById('weatherCountry').innerHTML = ((_a = weather === null || weather === void 0 ? void 0 : weather.sys) === null || _a === void 0 ? void 0 : _a.country) || "No info";
                    document.getElementById('weatherTemperature').innerHTML = "".concat((_b = weather === null || weather === void 0 ? void 0 : weather.main) === null || _b === void 0 ? void 0 : _b.temp, " \u00B0C") || "No info";
                    document.getElementById('weatherFeelsLike').innerHTML = "".concat((_c = weather === null || weather === void 0 ? void 0 : weather.main) === null || _c === void 0 ? void 0 : _c.feels_like, " \u00B0C") || "No info";
                    document.getElementById('weatherMinimumTemperature').innerHTML = "".concat((_d = weather === null || weather === void 0 ? void 0 : weather.main) === null || _d === void 0 ? void 0 : _d.temp_min, " \u00B0C") || "No info";
                    document.getElementById('weatherMaximumTemperature').innerHTML = "".concat((_e = weather === null || weather === void 0 ? void 0 : weather.main) === null || _e === void 0 ? void 0 : _e.temp_max, " \u00B0C") || "No info";
                    document.getElementById('weatherDescription').innerHTML = ((_f = weather === null || weather === void 0 ? void 0 : weather.weather[0]) === null || _f === void 0 ? void 0 : _f.description) || "No info";
                    document.getElementById('weatherHumidity').innerHTML = "".concat((_g = weather === null || weather === void 0 ? void 0 : weather.main) === null || _g === void 0 ? void 0 : _g.humidity, " %") || "No info";
                }
                return [2 /*return*/];
        }
    });
}); };

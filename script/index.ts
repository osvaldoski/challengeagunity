// definition of constants, including paths and keys
const basicWeatherPath = "https://api.openweathermap.org/data/2.5/weather"
const basicGeoPath = "http://api.openweathermap.org/geo/1.0/direct"
const flagPath = "https://openweathermap.org/images/flags"
const apiKey = "ae924b2ed8a85e1cbd910e9a5d67f925"


//search of place by input field, display a small list of 3 items, once an option its choosen it clean the list

const searchPlace = async () => {
    // reference html elements
    let name = document.getElementById('name') as HTMLInputElement
    let listPlaces = document.getElementById('listPlaces') as HTMLInputElement

    // clean list places in case that is already filled
    document.getElementById('listPlaces').innerHTML = ""

    //create endpoint route in base to the input value and api key
    let geolocationPath = `${basicGeoPath}?q=${name.value}&limit=3&appid=${apiKey}`


    //create place var and call the geo api to get the list
    let places = undefined
    places = await fetch(geolocationPath).then(response => response.json())

    //in case that places has content, we append the names and the flag to the html element
    if (places) {
        places.forEach(element => {
            let paragraph = document.createElement("p");
            let flag = document.createElement("img");

            paragraph.setAttribute("class", "place");
            paragraph.setAttribute("onclick", `searchWeather(${element.lat},${element.lon})`);

            flag.setAttribute("src", `${flagPath}/${element.country.toLowerCase()}.png`);
            flag.setAttribute("class", "flag");
            paragraph.innerHTML = `${element.name} ${element.country}`
            paragraph.appendChild(flag)
            listPlaces.append(paragraph);
        });
    }
};

// search of weathe by lat and lon
const searchWeather = async (lat, lon) => {
    //create api path
    let weatherLocationPath = `${basicWeatherPath}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    let displayWeather = document.getElementById('displayWeather') as HTMLInputElement
    //fetch weather information by lat and long via api 
    let weather = await fetch(weatherLocationPath)
        .then(response => response.json())

    if (weather) {
        //display weather div in case that weather is not null
        displayWeather.classList.remove("hiddenWeather")
        //remove list of places
        document.getElementById('listPlaces').innerHTML = ""
        //replaces values in every paragraph by id
        document.getElementById('weatherName').innerHTML = weather?.name || "No info"
        document.getElementById('weatherCountry').innerHTML = weather?.sys?.country || "No info"
        document.getElementById('weatherTemperature').innerHTML = `${weather?.main?.temp} °C` || "No info"
        document.getElementById('weatherFeelsLike').innerHTML = `${weather?.main?.feels_like} °C` || "No info"
        document.getElementById('weatherMinimumTemperature').innerHTML = `${weather?.main?.temp_min} °C` || "No info"
        document.getElementById('weatherMaximumTemperature').innerHTML = `${weather?.main?.temp_max} °C` || "No info"
        document.getElementById('weatherDescription').innerHTML = weather?.weather[0]?.description || "No info"
        document.getElementById('weatherHumidity').innerHTML = `${weather?.main?.humidity} %` || "No info"
    }


};

export { }
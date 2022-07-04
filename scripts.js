
const daynightEl = document.getElementById('daynight');
const tempvalueEl = document.getElementById('tempvalue');
const weathercontainerEl = document.getElementById('weather_container');
const weatherEl = document.getElementById('caracteres_day');
const temperaturedescriptionEl = document.getElementById('temperature_description');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherforecastitemEl = document.getElementById('weather_forecast_item');




const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

           
        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {wind_speed, sunrise, sunset} = data.current;

    timezone.innerHTML = data.timezone;
    //countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'
    tempvalueEl.innerHTML = data.current.temp + "&#176;<span>C</span>";
    temperaturedescriptionEl.innerHTML = data.current.weather[0].description;
    daynightEl.innerHTML = "<img src=http://openweathermap.org/img/w/"+ data.current.weather[0].icon +".png></img>"
    weatherEl.innerHTML = 
    `
   
    <div class="wind" id="weather">
        <div>Wind:&nbsp;</div>
        <img src="timeeer.svg" alt="time_icon">
        <div class="pression">&nbsp;${wind_speed}</div>
    </div>
    <div class="sunrise" id="weather">
        <img src="sunrise.svg" alt="sunrise_icon">
        <p>&nbsp;Sunrise:&nbsp;</p>
        <div class="sunrisetime">${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="sunset" id="weather">
        <img src="sunset.svg" alt="sunset_icon">
        <p>&nbsp;Sunset:&nbsp;</p>
        <div class="sunsettime">${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;


    let otherDayForcast = ''

    for(var i=1;i<6; i++){

        console.log("data.daily[i].weather[0].icon ", data.daily[i].weather[0].icon);
        
        otherDayForcast += `
        <div class="weather_forecast_item">
        <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="weather icon" class="w-icon">
        <div class="day">${window.moment(data.daily[i].dt*1000).format('ddd')}</div>
        <div class="forecast_tempeture">
        <div class="haut_temperture">
           <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Arrow_Blue_Up_001.svg" alt="haut_icon">
           <div class="temp"> ${data.daily[i].temp.night}&#176;</div>
        </div>
        <div class="basse_temperture">
           <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Red_Arrow_Down.svg" alt="basse_icon">
           <div class="temp"> ${data.daily[i].temp.day}&#176;</div>
        </div>
     </div>
      </div>
           
        `
    }

    weatherforecastitemEl.innerHTML = otherDayForcast;
}
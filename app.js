const API_KEY='a1905c837f244963a9eefcc0053681d0';
const BASE_URL ='https://api.openweathermap.org/data/2.5/weather';



const searchform = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImg = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card')

const ToCelcius =(kelvin)=>{
  celcius = Math.round(kelvin-273.15);
  return celcius
}

const isDayTime = (icon)=>{
  if(icon.includes('d')){
    return true;
  }else{return false}
}

const request_city = async (city)=>{
    
    const query = `?q=${city}&appid=${API_KEY}`;
    
    // Call API
    const response = await fetch(BASE_URL+query);
    const data = await response.json();
    return data
}


updateWeather=(city)=>{
  cityName.textContent = city.name;
  const imgname = city.weather[0].icon;
  
const iconSrc = `https://openweathermap.org/img/wn/${imgname}@2x.png`;
  cardBody.innerHTML=`
  <div class="card-mid row">
  <div class="col-8 text-center temp">
    <span>${ToCelcius(city.main.temp)}&deg;C</span>
  </div>
  <div class="col-4 condition-temp">
    <p class="condition">${city.weather[0].description}</p>
    <p class="high">${ToCelcius(city.main.temp_max)}&deg;C</p>
    <p class="low">${ToCelcius(city.main.temp_min)}&deg;C</p>
  </div>
</div>
<div class="icon-container card shadow mx-auto">
  <img src="${iconSrc}" alt="">
</div>

<div class="card-bottom px-5 py-4 row">
  <div class="col text-center">
    <p>${ToCelcius(city.main.feels_like)}&deg;C</p>
    <span>Feels Like</span>
  </div>
  <div class="col text-center">
    <p> ${city.main.humidity}%</p>
    <span>Humidity</span>
  </div>
</div>`

if(isDayTime(imgname)){
  timeImg.setAttribute('src','img/day_image.svg')
  if(cityName.classList.contains('text-white')){
    cityName.classList.remove('text-white')
  }else{
    cityName.classList.add('text-black')
  }
}else{
  timeImg.setAttribute('src','img/night_image.svg');
  if(cityName.classList.contains('text-black')){
    cityName.classList.remove('text-black')
  }else{
    cityName.classList.add('text-white')
  }
}

  cardInfo.classList.remove('d-none');
}


searchform.addEventListener('submit',(e)=>{
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  searchform.reset();

  request_city(citySearched)
  .then((data) =>{ updateWeather(data)})
  .catch((e)   =>{ console.log(e)   })

})
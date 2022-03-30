const api = {
  key : '0b602f69d0be15e22106f4493e16424d',
  base : ' https://api.openweathermap.org/data/2.5/'
}

const apiTime = 'https://maps.googleapis.com/maps/api/geocode/json?&address=paris';

const searchbox = document.getElementsByClassName('search-box')[0];
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResolts(searchbox.value);
  }
}

function getResolts(query) {
  fetch(`${api.base}weather?q=${query}&units=metrecc&APPID=${api.key}`)
    .then(weater => {
      return weater.json();
    }).then(displayResults);
}

function displayResults(weater) {
  console.log(weater); 
  let city = document.querySelector('.location .city');
  city.innerText = `${weater.name}, ${weater.sys.country}`;

  let now = new Date();
  let data = document.querySelector('.location .data');
  data.innerText = dataBuilder(now);

  let temp = document.querySelector('.current .temp');
  tempC = Math.round(weater.main.temp) - 273;
  temp.innerHTML = `${tempC} <span>&degC</span>`;

  let weater__el = document.querySelector('.current .weather');
  weater__el.innerText = weater.weather[0].main;

  let hilow = document.querySelector('.hi-low'),
  min = Math.round(weater.main.temp_min) - 273,
  max = Math.round(weater.main.temp_max) - 273;
  hilow.innerHTML = `${min} <span>&degC</span> / ${max} <span>&degC</span>`;

  let time = document.querySelector('.location .time');
  time.innerHTML = timeBuilder(weater.timezone);

  searchbox.value = '';
}

function dataBuilder(d) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function timeBuilder(offset) {
  let d = new Date(new Date().getTime() + (offset * 1000));
  let hrs = d.getUTCHours();
  let mins = d.getUTCMinutes();
  if (hrs <= 9) {
    hrs = `0${hrs}`;
  }
  if (mins <= 9 ) {
    mins = `0${mins}`
  }
  let timeCity = `${hrs} : ${mins}`;
  changeBackground(timeCity);
  return timeCity;
}

function changeBackground(time) {
  let t = +time.split(':')[0],
    body = document.body;

  if(t >= 6 && t <= 8) {
    body.classList.remove('day','sunset','night');
    body.classList.add('sunrise');  
  }
  if(t >= 9 && t <= 17) {
    body.classList.remove('sunrise','sunset','night');
    body.classList.add('day');
  }
  if(t >= 18 && t <= 21) {
    body.classList.remove('sunrise','day','night');
    body.classList.add('sunset');
  }
  if (t >= 22 && t <= 24 || t >= 0 && t <= 5) {
    body.classList.remove('sunrise','day','sunset');
    body.classList.add('night');
  }
}

let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;
const api = "6d055e39ee237af35ca066f35474e9df";  

const btn = document.querySelector(".btn")

const renderData = (data) =>{
  console.log(data);
          temperature.textContent = 
          Math.floor(data.main.temp - kelvin) + "°C";
          summary.textContent = data.weather[0].description;
          loc.textContent = data.name + "," + data.sys.country;
          let icon1 = data.weather[0].icon;
          icon.innerHTML = 
   `<img src="https://img.icons8.com/color/2x/partly-cloudy-rain--v2.gif" style= 'height:10rem'/>`
}

btn.addEventListener('click', function(e){
  const city = document.getElementById('cityinput').value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
  .then(res => res.json())
  .then(data => {
        renderData(data);
  })
  .catch(err => alert('Please enter a valid city'))
})


window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      
      const base =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
`lon=${lon}&appid=${api}`;
  
      
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          renderData(data);
        });
    });
  }
});
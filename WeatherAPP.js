window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let getTime = document.querySelector('.date-time');
    const temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.degree-section span')
    // TIME
    function getCurrentTime(){
        const currentTime = new Date();
        let hour = currentTime.getHours();
        let minute = currentTime.getMinutes();
        let second = currentTime.getSeconds();
        if(hour.toString().length == 1){
            hour = "0"+hour;
        }
        if(minute.toString().length == 1){
            minute = "0"+minute;
        }
        if(second.toString().length == 1){
            second = "0"+second;
        }
        getTime.textContent = hour + " : " + minute + " : " + second ;
    }
    setInterval(getCurrentTime,1000)
    //WINDOW LOAD TIME
    getCurrentTime();
    // SET 
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;
          // const proxy = 'https://cors-anywhere.herokuapp.com/'; 
          const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1daf2bb85829e2e898c4edddb44b3d5a`
          fetch(api)
          .then (response => {
            return response.json();
          })
          .then (data => {
              console.log(data);
              var tempDeg = data.main.temp; // Fahreneit
              var tempDesc = data.weather[0].description;
              var locTZ = data.name;
              var icon = data.weather[0].icon;
              let celcius = tempDeg -272.15; 
              //SET ICON    
              function setIcons(iconID){
                var k =  `http://openweathermap.org/img/wn/${iconID}@2x.png`
                return k;
              }
              // Change Temperature
              temperatureSection.addEventListener('click',() => {
                  if(temperatureSpan.textContent === "C°"){
                      temperatureSpan.textContent = "K°";
                      temperatureDegree.textContent=Math.floor(tempDeg);
                  }
                  else {
                      temperatureSpan.textContent = "C°";
                      temperatureDegree.textContent=Math.floor(celcius);
                  }
              })
              console.log(setIcons(icon))
              document.querySelector(".icon").src=setIcons(icon);
              //Sete Dom elements from the API -- API'den verileri alacağız...
              temperatureDegree.textContent = Math.floor(celcius);
              temperatureDescription.textContent = tempDesc;
              locationTimezone.textContent = locTZ;
          })
      })
    }
    else {
        h1.textContent = "Hey this is not working because of some problems!";
    }
})









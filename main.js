const findMyCity = (req) => {
  const status = document.querySelector('.status');
  
  const success = (position) => {
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude; 
    //console.log(latitude+" "+longitude) 
    
    const geoApiUrl =`https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_6b6ee21d4bbb4e9792d368847e82495e`

    fetch(geoApiUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const cityname = data.city
      
      console.log("City name is ", cityname)
      req.city=cityname
      return data
      
    })
  }

  const error = () => {
    status.textContent = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(success, error);
}


window.onload = findMyCity;

module.exports = {findMyCity};
//document.querySelector('.find-city').addEventListener('click', findMyCity);

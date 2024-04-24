const sendCityToWebhook = (city) => {
  fetch('/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cityname: city }) // Send city in the request body
  })
  .then(res => res.json())
  .then(data => {
    console.log("Response from webhook:", data);
  })
  .catch(error => {
    console.error("Error sending city to webhook:", error);
  });
}


const findMyCity = () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude; 
    
    const geoApiUrl =`https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_6b6ee21d4bbb4e9792d368847e82495e`

    fetch(geoApiUrl)
    .then(res => res.json())
    .then(data => {
      const cityname = data.city
      console.log("City name is ",cityname);
      sendCityToWebhook(cityname); // Call function to send city to webhook
    });
  }

  const error = () => {
    console.error("Unable to retrieve your location");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}


window.onload = findMyCity;

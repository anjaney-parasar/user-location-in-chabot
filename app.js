const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const port = 3000;
const {findMyCity} =require('./main.js')

app.use(bodyParser.json()); // Apply body-parser middleware

// Define the route for the webhook (using a POST method)
app.post('/webhook',findMyCity, (req, res) => {
      
  // Access the request body (now parsed as JSON)
  const payload = req.body;
  // const city= req.cityname;
  const session= payload.sessionInfo.session
  
  console.log("request body is:", payload);
  
  // Respond with a success message (optional)
  const fullfilment= {
    "fulfillmentResponse": {
        "messages": [
            {
                "text": {
                    "text": [
                        `Response from webhook ${req.city}`] 
                }
            }
        ]
    },
    "session_info": {
      "session": session,
      "parameters": {
          "user_location": city
      }
  }
}

  res.send(fullfilment);
});

// Start the server and listen for requests
app.listen(port, () => console.log(`Server listening on port ${port}`));

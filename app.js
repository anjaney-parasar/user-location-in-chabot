const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const port = 3000;

app.use(bodyParser.json()); // Apply body-parser middleware


// app.post('/webhook', (req,res) => {
//   const payload =req.body;
//   const userLocation = payload.userLocation;
//   res.send("");

// })

// Define the route for the webhook (using a POST method)

app.post('/webhook', (req, res) => {

  // const newcity=localStorage.getItem("nameofcity")
  
  // Access the request body (now parsed as JSON)
  const payload = req.body;
  const session= payload.sessionInfo.session;
  const userLocation = payload.userLocation;
  console.log("request body is: ", userLocation);
  
  
  
  // Respond with a success message (optional)
  const fullfilment= {
    "fulfillmentResponse": {
        "messages": [
            {
                "text": {
                    "text": [
                        `Response from webhook ${userLocation}`] 
                }
            }
        ]
    },
    "session_info": {
      "session": session,
      "parameters": {
          "user_location": userLocation
      }
  }
}
res.json({message:"it is "})
  // res.send(fullfilment);
});

// Start the server and listen for requests
app.listen(port, () => console.log(`Server listening on port ${port}`));

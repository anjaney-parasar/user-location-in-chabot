const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const city = req.body.cityname; // Extract city from request body
  const session = req.body.sessionInfo.session;

  console.log("Received city:", city);

  const fulfillment = {
    "fulfillmentResponse": {
        "messages": [
            {
                "text": {
                    "text": [
                        `Response from webhook: ${city}`
                    ] 
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

  res.json(fulfillment);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

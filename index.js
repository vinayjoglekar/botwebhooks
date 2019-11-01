var request = require('request');
var http = require('http');
var bodyparser = require('body-parser');
const {parse} = require('querystring');
//create a server object:
const app = http.createServer(function (req, res) {
    
    if (req.method == 'POST') {
        
        var body = ''
        req.on('data', function(data) {
          body += data;
          console.log("body :" , body);
    var parsedData = JSON.parse(body);
    
    // req.body.queryResult.parameters['location'];//agent.parameters.location.city;
    var loc = parsedData.queryResult.parameters.location.city;
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid=07f145d8a2550bdf4d2bb0de56a95506&units=metric";
    request(apiUrl, function(error,request,body){ 
        if(error){
            let responobj = {
                "fulfillmentText": "Try with some another place",
                "fulfillmentmessages": "",
                "source" : " ",
            } 
            res.end(JSON.stringify(responobj));
            return;
        }
        var response = JSON.parse(body);
        var responseText = `In ${loc}, It's ${response.weather[0].description} and temperature is ${response.main.temp} °C`
        let responobj = {
          "fulfillmentText": responseText,
          "fulfillmentmessages": "",
          "source" : " ",
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "this is a simple response"
                    }
                  }
                ]
              }
            }
        }
      }
    //   return res(responobj);
        // res.send(responobj);
        console.log("Response send")
        res.end(JSON.stringify(responobj));

     });
    });
    }
});

// app.use(bodyparser);
app.listen(80);//the server object listens on port 8080


// function ('/webhook'){
//     
//  }
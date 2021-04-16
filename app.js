const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  //console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "<generate_an_api_key>";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


      res.write("<h1>The weather is currently: " + weatherDescription + "</h1>");
      res.write("<h2>The temperature in " + query + " is: " + temp + " degrees Fahrenheit.</h2>");
      res.write("<img src=" + imgURL + ">");
      res.send();

      //There can only be one res.send...below is a way I found to work using line break and html code embedded in the contatenated string

      // res.send("<h1>The temperature in Nosara is: " + temp + " degrees Fahrenheit.</h1><br/><h2>The weather is currently: " + weatherDescription + ".</h2>");

      // EXAMPLE of a way to create an object and stringify the JSON object
      // const object = {
      //   name: "Brandon",
      //   favoriteFood: "What day is it?"
      // };
      // console.log(JSON.stringify(object));
    });
  });
});


app.listen(port, function() {
  console.log("Server is running on port " + port);
});

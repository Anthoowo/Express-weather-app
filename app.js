const express = require("express");
const https = require("https");


const app  = express();
app.use(express.urlencoded()) ;

app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/index.html");

})

app.post("/", (req,res)=>{


const city = req.body.cityName;
const apiKey = "a7e13ec387500d0840cde590efc90464";
 // Api entry point url
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

 https.get(url, (response)=> {

   //  console.log(response.statusCode)

   response.on("data", (data)=>{
     const weatherData = JSON.parse(data);
    
     const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    res.write(`<p>The temperature in ${city} is ${temp} degress  <p>`)
    res.write(`<h1>The weather is currently ${weatherDescription} degress  <h1/>`);
    res.send();
  })
})





} )
// 



app.listen(5000, ()=> console.log("server is running on port 5k"))
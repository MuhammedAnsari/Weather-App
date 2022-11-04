const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log(req.body.cityname);

    const query = req.body.cityname

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=8e54a276957d6e671025ed40dc25f522&units=metric"
    https.get(url, function (response) {
        console.log(response);

        response.on("data", function (data) {
            const whetherdata = JSON.parse(data)
    
            const temp = whetherdata.main.temp
            console.log(temp);

            const description = whetherdata.weather[0].description
            console.log(description);

            const icon = whetherdata.weather[0].icon

            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>Temperature in " + query + " is " + temp + " degree celcious</h1>")
            res.write("<h3>Whether is currently " + description + "</h3>")
            res.write("<img src=" + imageurl + ">")
            res.send()

        })

    })
})




app.listen(3000, function() {
    console.log("Server is running on port 3000");
})
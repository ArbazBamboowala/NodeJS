const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const apiKey = '4e2e84b41ddc9a9cb1a7b26f5d4cf38c';

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

app.get('/', function(req,res)
{
    res.render('index',{weather: null, error: null})
})
app.post('/', function(req,res){
    let city=req.body.city;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}";
    console.log(req.body.city);
    request(url, function(err, response,body){
        if(err){
            res.render('index',{weather: null, error: 'Error, please try again!!'
        });
    }
        else {
            let weather = JSON.parse(body);
            if (weather.main == undefined)
            {
                res.render('index',{
                    weather: null,
                    error:'Error, try again'
                });
            } else{
                let weatherText = 'It is ${weather.main.temp} degrees celcius with ${weather.weather[0].main} in ${weather.name}!';
                res.render('index', {weather:weatherText, error:null});
                console.log("body",body);
            }
        
        }
        
    });
});
app.listen(3003,function() {
    console.log("Weatherly app listening on port 3003!");
});
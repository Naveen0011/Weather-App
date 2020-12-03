const express = require('express');
const path = require('path');
const app = express();
const rootName = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const viewPartials = path.join(__dirname,'../templates/partials');
const hbs = require('hbs');
const geoLocation = require('../utils/geoLocation');
const forecast = require('../utils/forecast');

app.use(express.static(rootName));
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(viewPartials);

app.get('',(req,res)=>{
    res.render('index',{
        header : 'Weather',
        name : 'Created by Naveen'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        header : 'About Page',
        name : 'Created by Naveen'
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        header : 'Help Page',
        message : "This is the help text",
        name : "Created By Naveen"
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error : 'Please give the location'
        });
    }
    geoLocation(req.query.location,(err,{Latitude,Longitutde,Location}={})=>{
        if(err){
            return res.send({
                error : err
            });
        }
        forecast(Latitude,Longitutde, (error, fordata) => {
            if(error){ 
                return res.send({
                    error : error
                });
            }
            res.send({
                location : Location,
                temperature : `The temperature is ${fordata.temp} degree celcius`
            });
        });
    });    
});

app.get('/help/*',(req,res)=>{
    res.render('error',{
        header : "Error Page",
        message : "Help page not found",
        name : "Created By Naveen"
    });
});

app.get('*',(req,res)=>{
    res.render('error',{
        header : "Error Page",
        message : "Page Not Found",
        name : "Created By Naveen"
    });
});


app.listen(3000,()=>{
    console.log("Listening to port 3000");
});
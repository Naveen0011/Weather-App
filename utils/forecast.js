const request = require('postman-request');

const forecast = (Latitude,Longitutde,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=cf6f53117b0a8cc827438d8304beaec8&query=${Latitude},${Longitutde}`;
    request({url,json:true},(err,res)=>{
        if(err){
            callback("Unable to make the reqeuest - Weather",undefined);
        } else if(res.body.err){
            callback("Unable to retrieve the data for location - Weather",undefined);
        } else {
            callback(undefined,{
                temp : res.body.current.temperature,
                feels : res.body.current.feelslike
            });
        }
    });    
}
module.exports = forecast;
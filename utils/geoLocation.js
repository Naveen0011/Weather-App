const request = require("postman-request");

const geoLocation = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic25hdmVlbjEwMCIsImEiOiJja2hwM2NvMnYwZnNsMnRwNTJ1OTEzemd2In0.9GbufwMhw0qndgDgx0vgKw`;
    request({url,json:true},(err,res)=>{

        if(err){
            callback("Unable to make the request",undefined);
        } else if(res.body.features === undefined){
            callback("Unable to find the location",undefined);
        } else {
            callback(undefined,{
                Latitude : res.body.features[0].center[1],
                Longitutde : res.body.features[0].center[0],
                Location : res.body.features[0].place_name
            })
        }
    });
}

module.exports = geoLocation;
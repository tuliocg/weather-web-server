const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://webapi.microvix.com.br/1.0/api/integracao'

    request( {url, json: true} , (error, {body} = response) => {

        if(error){
            console.log(error);
            
            callback('Unable to connect to services', undefined)
            
        }else if (body.features.length === 0 )
        {
            console.log(error);
            
            callback('Unable to find location', undefined)
        }else{
            console.log(body);
            
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
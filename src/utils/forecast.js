const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/842ca46469b7a0e0618d201b643f1b88/'+latitude+','+longitude+'?units=si&lang=pt'
    
    request( {url, json: true} , (error, {body} = response) => {
        
        if(error){
            callback('Unable to connect to weather service', undefined)
            
        }else if (body.error ) {
            callback('Unable to find location', undefined)

        }else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability * 100 + ' % chance of rain')
        }
    })

}

module.exports = forecast


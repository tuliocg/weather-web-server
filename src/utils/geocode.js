const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidHVsaW9jZyIsImEiOiJjanQxejZ5cTMxZHhyM3lwYTFkN3AyM3BoIn0.2LW5J5MRePPWWfiPkZAp7Q&limit=1'

    request( {url, json: true} , (error, {body} = response) => {

        if(error){
            callback('Unable to connect to services', undefined)
            
        }else if (body.features.length === 0 )
        {
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
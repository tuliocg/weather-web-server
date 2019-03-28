const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//paths settings
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tulio'
    })
})

app.get('/help', (req, res) => {
    res.render('help', 
    {
        helpMessage: 'Here you can find peace',
        title: 'Help',
        name: 'Tulio'})
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Tulio ' 
    }
    )
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must define a address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
        if (error) {
            return res.send ({error})
        }

        forecast(latitude, longitude,  (error, forecastData) => {
            if(error) {
                return res.send ({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'help 404 error',
        name: 'Tulio ' 
    }
    )
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: '404 error',
        name: 'Tulio ' 
    }
    )
})

app.listen(port, () => {
    console.log('server is up on port '+port);
    
})
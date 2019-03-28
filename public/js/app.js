console.log('client side java script is loaded');

fetch('http://localhost:3000/weather?address=florianopolis').then((response) => {
    response.json().then((data) =>  {
        if(data.error)
        {
            console.log(data.error)
        } else {
            console.log(data.forecast)
            console.log(data.location);
        }  
    })
})

/* Global Variables */
const key = 'fbea738c9a1bf72c2d1a29fdaa2a304a',
    baseURI = 'http://api.openweathermap.org/data/2.5/weather',
    generate = document.querySelector('#generate'),
    zipCode = document.querySelector('#zip'),
    feelings = document.querySelector('#feelings'),
    date = document.querySelector('#date'),
    temp = document.querySelector('#temp'),
    content = document.querySelector('#content');
    

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


async function  getWeather(zipCode) {
    const uri = `${baseURI}?zip=${zipCode}&appid=${key}`;

    let response = await fetch(uri);

    try{
        let data = await response.json();
        return data;
    } catch(e) {
        console.log(e);
        
    }


}

async function saveData(weather) {
    let data = {
        temperature: weather.main.temp,
        date: newDate,
        userResponse: feelings.value || '',
    }
    let response = await fetch('/save', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    return response;
}

async function getEntrys() {
    

    let response = await fetch('/recent');

    try {
        let data = await response.json();
        return data;
    } catch (e) {
        console.log(e);

    }


}


generate.addEventListener('click', () => {
    if (zipCode.value) {

        getWeather(zipCode.value).then(saveData).then(getEntrys).then(data => {
            date.innerHTML = `Date: ${data.date}`;
            temp.innerHTML = `Temperature: ${data.temperature}`;
            content.innerHTML = `User's note: ${data.userResponse}`;

            
        });
    }
    
    
})
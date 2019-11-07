function convertFarengeightToCelcius (far) {
    return Math.round((far - 273.15) * 10) / 10
}
function clearBlock(block) {
    if (block.firstChild) {
        block.innerHTML = '';
    }
    block.classList.remove('success', 'failed')
}

function createURLByCityName (cityName) {
    return 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=' + cityName +
        '&appid=b88ae6b1211078df478d7544a65d22f9'
}

function getDataFromJSON (response, error = false) {
    if (error) {
        return {
            errorMessage: response.message
        };
    }
    let temp = convertFarengeightToCelcius(response.main.temp),
        timezone = response.timezone / 3600,
        date = new Date (response.dt * 1000),
        pressure = response.main.pressure/10,
        humidity = response.main.humidity,
        windSpeed = response.wind.speed;
    let secs = date.getSeconds(),
        mins = date.getMinutes(),
        hours = date.getHours(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (mins < 10) {
        mins = '0' + mins;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (secs < 10) {
        secs = '0' + secs;
    }
    date = day + '.' + month + '.' + year + ' ' + hours + ':' + mins + ':' + secs;
    return {
        timezone: timezone,
        date: date,
        wind: windSpeed,
        humidity: humidity,
        pressure: pressure,
        temperature: temp,
        city: city.value
    };
}

window.onload = function () {
    const btn = document.getElementById('search');
    const city = document.getElementById('city');
    btn.addEventListener('submit', function (ev) {
        ev.preventDefault();
        let xhr = new XMLHttpRequest();
        const url = createURLByCityName(city.value)
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            clearBlock(weather);
            let template;
            let compiled;
            let html;
            let data;
            const response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                template = document.getElementById('template-weather').innerHTML;
                compiled = _.template(template);
                html = '';
                data = getDataFromJSON(response)
                weather.classList.add('success')
            }
            else {
                template = document.getElementById('template-error').innerHTML;
                compiled = _.template(template);
                html = '';
                data = getDataFromJSON(response, true)
                weather.classList.add('failed')
            }
            html += compiled(data);
            weather.insertAdjacentHTML('beforeend', html);
        };
        xhr.send();
        city.value = '';
    })
}

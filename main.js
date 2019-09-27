window.onload = function () {
    const btn = document.getElementById('search');
    const city = document.getElementById('city');
    btn.addEventListener('submit', function (ev) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=' + city.value +
            '&appid=b88ae6b1211078df478d7544a65d22f9', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                let temp = Math.round((response.main.temp - 273.15) * 10) / 10,
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
                let template = document.getElementById('template-weather').innerHTML,
                    compiled = _.template(template),
                    html = '';
                const data = {
                    timezone: timezone,
                    date: date,
                    wind: windSpeed,
                    humidity: humidity,
                    pressure: pressure,
                    temperature: temp,
                    city: city.value
                };
                html += compiled(data);
                if (weather.firstChild)  {
                    weather.innerHTML = '';
                }
                weather.insertAdjacentHTML('beforeend', html);
                ev.preventDefault();
            }
            else {
                if (weather.firstChild)  {
                    weather.innerHTML = '';
                }
                let template = document.getElementById('template-error').innerHTML,
                    compiled = _.template(template),
                    html = '';
                const data = {
                    errorMessage: JSON.parse(xhr.responseText).message
                }
                html += compiled(data);
                weather.insertAdjacentHTML('beforeend', html);
                ev.preventDefault();
            }
        };
        xhr.send();
    })
}

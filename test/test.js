
const example =
{
    coord: {
        lon: 41.97,
        lat: 45.04
    },
    weather: [
    {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04n"
    }
    ],
    base: "stations",
    main: {
        temp: 284.92,
        pressure: 1018,
        humidity: 58,
        temp_min: 284.82,
        temp_max: 285.15
    },
    visibility: 10000,
    wind: {
        speed: 3,
        deg: 140
    },
    clouds: {
        all: 86
    },
    dt: 1573159415,
    sys: {
        type: 1,
        id: 8968,
        country: "RU",
        sunrise: 1573099088,
        sunset: 1573134805
    },
    timezone: 10800,
    id: 487846,
    name: "Stavropol",
    cod: 200
};
const error = {
    cod: "404",
    message: "city not found"
};


describe('convertFarengeightToCelcius', function () {
    it('should convert 273.15 far to 0 cels', function () {
        chai.expect(convertFahrenheitToCelcius(273.15)).to.equal(0);
    });
    it ('should convert 284.92 far to 11.8 cels', function () {
        chai.expect(convertFahrenheitToCelcius(284.92)).to.equal(11.8);
    });
});

describe('createURLByCityName', function () {
    it('should return URL with city Kemerovo', function () {
        chai.expect(createURLByCityName('Kemerovo')).to.have.string('Kemerovo')
    });
    it('should return URL with city Москва', function () {
        chai.expect(createURLByCityName('Москва')).to.have.string('Москва')
    });
    it('should return URL with city Saint Petersburg', function () {
        chai.expect(createURLByCityName('Saint Petersburg')).to.have.string('Saint Petersburg')
    });
});

describe('getDataFromJSON', function () {
    describe('without errors', function () {
        it('should be an object', function () {
            chai.expect(getDataFromJSON(example)).to.be.an('object')
        });
        it('should have field timezone', function () {
            chai.expect(getDataFromJSON(example)).to.have.own.property('timezone')
        });
        it('should have field date', function () {
            chai.expect(getDataFromJSON(example)).to.have.own.property('date')
        });
        it('should have field wind', function () {
            chai.expect(getDataFromJSON(example)).to.have.own.property('wind')
        });
        it('should have field humidity', function () {
            chai.expect(getDataFromJSON(example)).to.have.own.property('humidity')
        });
        it('should have field pressure', function () {
            chai.expect(getDataFromJSON(example)).to.have.own.property('pressure')
        });
        it('should have field temperature', function () {
            chai.expect(getDataFromJSON(example)).to.have.own.property('temperature')
        });
        it('should have field city', function () {
            chai.expect(getDataFromJSON(example)).to.have.own.property('city')
        });
    });
    describe('with error', function () {
        it('should have field errorMessage', function () {
            chai.expect(getDataFromJSON(error, true)).to.have.own.property('errorMessage')
        });
    });
});
describe('draw element', function () {
   it('should draw info element', function () {
        drawElement(example, document.getElementById('weather'), false);
        chai.expect(document.getElementById('info')).not.to.be.an('null');
   });
   it ('should draw error element', function () {
       drawElement({message: 'error'}, document.getElementById('weather'), true);
       chai.expect(document.getElementById('error')).not.to.be.an('null');
   });
});
describe('delete element', function () {
    it ('should left the page as it is', function () {
        const test = document.getElementById('weather');
        test.insertAdjacentHTML('beforeend', '<div id="info"></div>');
        chai.expect(test.firstChild).not.to.be.an('null');
        clearBlock(test);
        chai.expect(test.firstChild).to.be.an('null');
    })
});
describe('make request', function () {
    it ('should make request without failing', function (done) {
        makeRequest('Moscow').then(response => {
            chai.expect(response.cod).to.equal(200);
            done();
        })

    });
    it('should make request with an error', function (done) {
        makeRequest('sdf').catch(error => {
            chai.expect(error.cod).to.equal('404');
            done();
        })
    })
})
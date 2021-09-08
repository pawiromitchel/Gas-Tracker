// bootstrap Vue
var app = new Vue({
    el: '#app',
    data: {
        progressValue: 0,
        date: '',
        chains: [],
    }
});

const endpoint = 'https://api.zapper.fi/v1/gas-price?api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241&network=';
const chains = ['ethereum', 'fantom', 'polygon', 'binance-smart-chain'];

async function getGasPrices(network) {
    const response = await fetch(`${endpoint}${network}`);
    const movies = await response.json();
    return movies;
}

function getData() {
    app.date = new Date().toString();
    app.chains = [];
    chains.forEach(async chain => {
        const req = getGasPrices(chain);
        const res = await req;
        app.chains.push({
            name: capitalize(removeDashes(chain)),
            gasPrice: res
        })
    });
}

getData();

let counter = 25;
const newYearCountdown = setInterval(function () {
    counter--;
    app.progressValue += 4;
    if (counter === 0) {
        getData();
        // reset the values
        app.progressValue = 0;
        counter = 25;
    }
}, 1000);
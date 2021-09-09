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

    const requests = chains.map(chain => getGasPrices(chain));
    Promise.all(requests).then(res => {
        res.map((gasPrices, index) => {
            app.chains.push({
                name: capitalize(removeDashes(chains[index])),
                gasPrice: gasPrices
            })
        })
    })
}

getData();

let counter = 100;
const newYearCountdown = setInterval(function () {
    counter--;
    app.progressValue += 1;
    if (counter === 0) {
        getData();
        // reset the values
        app.progressValue = 0;
        counter = 100;
    }
}, 500);

const endpoint = 'https://api.zapper.fi/v1/gas-price?api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241&network=';
const chains = ['ethereum', 'fantom', 'polygon', 'binance-smart-chain'];

// bootstrap Vue
const GasTracker = {
    data() {
        return {
            progressValue: 0,
            date: '',
            chains: [],
            counter: 100,
            refreshed: false
        }
    },

    methods: {
        getGasPrices: async (network) => {
            const response = await fetch(`${endpoint}${network}`);
            const prices = await response.json();
            return prices;
        },

        boilerplate: () => {
            chains.forEach(chain => {
                app.chains.push({
                    name: capitalize(removeDashes(chain)),
                    gasPrice: {
                        instant: 0,
                        fast: 0,
                        standard: 0,
                    }
                })
            })
        },

        getData: async () => {
            app.date = new Date().toString();
            const data = await Promise.all(chains.map(chain => app.getGasPrices(chain)))
            data.map((gasPrices, index) => {
                app.chains[index].gasPrice = gasPrices;
            })
        },

        timerCountdown: setInterval(function () {
            app.counter--;
            app.progressValue += 1;
            if (app.counter === 0) {
                app.getData();
                // reset the values
                app.progressValue = 0;
                app.counter = 100;
            }
        }, 500)
    },

    watch: {
        chains() {
        },

        date() {
            app.refreshed = true
            setTimeout(() => {
                app.refreshed = false
            }, 1000)
        }
    },

    updated() {
    }

}
const app = Vue.createApp(GasTracker).mount('#app');

app.boilerplate()
app.getData()






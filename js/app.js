const endpoint = 'https://api.zapper.fi/v2/gas-prices?api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241&eip1559=false&network=';
const chains = ['ethereum', 'fantom', 'polygon', 'binance-smart-chain'];

// bootstrap Vue
const GasTracker = {
    data() {
        return {
            progressValue: 0,
            date: '',
            chains: [],
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
            const date = new Date();
            app.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            const data = await Promise.all(chains.map(chain => app.getGasPrices(chain)));
            data.map((gasPrices, index) => {
                app.chains[index].gasPrice = gasPrices;
            });
        },

        timerCountdown: setInterval(function () {
            app.getData();
        }, 10000)
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

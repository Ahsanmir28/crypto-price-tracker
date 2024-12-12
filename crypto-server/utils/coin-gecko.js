const router = require('express').Router()
const coin_gecko_client = require('./client')

router.get('/', async (req, res) => {
    try {
        const response = await coin_gecko_client.get('ping')
        console.log(response)
        return res.status(200).send(response.data)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
})

router.get('/search', async (req, res) => {
    const { search, filter } = req.query;
    try {
        // Fetch data from CoinGecko
        const response = await coin_gecko_client.get(`coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false,
            },
        });

        let data = response.data;

        // // Apply search filter
        if (search) {
            const searchTerm = search.toLowerCase();
            data = data.filter(
                (coin) =>
                    coin.name.toLowerCase().includes(searchTerm) ||
                    coin.symbol.toLowerCase().includes(searchTerm)
            );
        }

        // Apply price change filter
        if (filter === 'increase') {
            data = data.filter((coin) => coin.price_change_24h > 0);
        } else if (filter === 'decrease') {
            data = data.filter((coin) => coin.price_change_24h < 0);
        }

        return res.json(data);
    } catch(error) {
        console.log(error)
        return res.send(500).send('Internal Server Error')
    }
})

module.exports = router
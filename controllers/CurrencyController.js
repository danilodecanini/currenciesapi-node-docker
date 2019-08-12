const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const Currency = require('../models/Currency');
const moment = require('moment');


module.exports = {
    async updateAll(req, res) {        

        const currentDate = moment().subtract(50, 'minutes').toISOString();
        const currentValues = await Currency.findOne({}, {}, { sort: { 'created_at' : -1 } });

        if(!currentValues) {
            console.log("Record not found in the database, inserting....");

            const responseDolar = await axios.get(`https://api.hgbrasil.com/finance?format=json-cors&key=${process.env.API_KEY}`);
            const responseSelic = await axios.get(`https://api.hgbrasil.com/finance/taxes?format=json-cors&key=${process.env.API_KEY}`);

            const currencies = await Currency.create({
                current_dolar_value: responseDolar.data.results.currencies.USD.buy,
                current_selic_value: responseSelic.data.results[0].selic
            });

            res.json(currencies);
            return
        }

        //Convert values above to date type
        if(currentValues.createdAt < currentDate ){
            console.info("The current record in the database is less than 30 minute. Updating the record...");
            //Atualiza registro
            return
        } else {
            console.log("The current record in the database is already uptodate.");
            res.json(currentValues);
            return
        }
    },

    async getCurrencies(req, res) {
        const dolar = await Currency.findOne({}, {}, { sort: { 'created_at' : -1 } });

        res.json(dolar);
        return
    }
}
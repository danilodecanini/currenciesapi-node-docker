const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const Currency = require('../models/Currency');
const moment = require('moment');


module.exports = {
    async updateAll(req, res) {
        
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
        
        const currentDateConverted = Date.parse(moment().subtract(process.env.MINUTES, 'minutes').toISOString());
        const currentValueDate = Date.parse(currentValues.createdAt);

        if(currentValueDate < currentDateConverted ){
            console.info(`The current record in the database is less than ${process.env.MINUTES} minutes. Updating the record...`);
            //Update record            

            const id = currentValues._id;
            await Currency.findOneAndDelete({ _id: id});

            const responseDolar = await axios.get(`https://api.hgbrasil.com/finance?format=json-cors&key=${process.env.API_KEY}`);
            const responseSelic = await axios.get(`https://api.hgbrasil.com/finance/taxes?format=json-cors&key=${process.env.API_KEY}`);
            
            const currencies = await Currency.create({
                current_dolar_value: responseDolar.data.results.currencies.USD.buy,
                current_selic_value: responseSelic.data.results[0].selic
            });

            res.json(currencies);

            return
        } else {
            console.log("The current record in the database is already uptodate.");
            res.json(currentValues);
            return
        }
    },

    async getCurrencies(req, res) {
        const dolar = await Currency.findOne({}, {}, { sort: { 'created_at' : -1 } });

        if(!dolar) {
            return res.json({ message: "Need to call the update method first."})
        }
        res.json(dolar);
        return
    }
}
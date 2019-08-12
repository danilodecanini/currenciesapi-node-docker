const { Schema, model } = require('mongoose');

const CurrencySchema = new Schema({
    current_dolar_value: {
        type: Number,
    },
    current_selic_value: {
        type: Number,
    },
}, {
    timestamps: true,
});

module.exports = model('Currency', CurrencySchema);
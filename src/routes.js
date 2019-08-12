const { Router } = require('express');

const CurrencyController = require('../controllers/CurrencyController');

const routes = Router();

routes.get('/currencies', CurrencyController.getCurrencies); 
routes.put('/currencies/update', CurrencyController.updateAll);

module.exports = routes;
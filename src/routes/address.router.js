const { Router } = require('express');
const { USER } = require('../configs/constants');
const addressControllers = require('../controllers/address');
const auth = require('../middlewares/auth');
const addressRouter = Router();

addressRouter.get('/', auth(USER), addressControllers.queryAddressByUser);

addressRouter.post('/', auth(USER), addressControllers.createAddress);
addressRouter.put('/:_id', auth(USER), addressControllers.updateAddress);
addressRouter.delete('/:_id', auth(USER), addressControllers.removeAddress);

module.exports = addressRouter;

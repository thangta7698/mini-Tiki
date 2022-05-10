const { Router } = require('express');
const { SUPER, USER, ADMIN } = require('../configs/constants');
const UserControllers = require('../controllers/user/index');
const auth = require('../middlewares/auth');
const userRouter = Router();

userRouter.get('/:_id', UserControllers.getOneUser);
userRouter.get('/', auth(ADMIN), UserControllers.queryUsers);

userRouter.put('/:_id', auth(USER), UserControllers.updateUser);
userRouter.put(
  '/update-password/:_id',
  auth(USER),
  UserControllers.changePassword
);
userRouter.post('/admin', auth(USER), UserControllers.createAdmin);
userRouter.post('/', UserControllers.createUser);
userRouter.post('/google', UserControllers.loginWithGoogle);

userRouter.delete('/:_id', auth(ADMIN), UserControllers.removeUser);
userRouter.delete('/staff/:_id', auth(SUPER), UserControllers.removeUser);

module.exports = userRouter;

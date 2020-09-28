const routes = require('express').Router();
const multer = require('multer');
const multerconfig = require('./config/multerConfig');

const pedidoController = require('./controllers/pedidoController');
const produtoController = require('./controllers/produtosController');
const categoriaController = require('./controllers/categoriaController');
const fotoController = require('./controllers/fotoController');
const sessionController = require('./controllers/SessionController');
const userController = require('./controllers/userController');
const empresaController = require('./controllers/empresaController');

const auth = require('./midware/auth');

routes.post('/pedido', pedidoController.store);

routes.post('/produto', auth, produtoController.store);
routes.get('/produtos/categoria', produtoController.show);
routes.delete('/produto', auth, produtoController.destroy);

routes.post('/categoria', auth, categoriaController.store);
routes.get('/categorias', categoriaController.show);

routes.post('/empresa', auth, empresaController.store);
routes.get('/empresa', empresaController.show);

routes.post('/usuario', userController.store);

routes.post('/auth', sessionController.store);

routes.post('/check/auth', auth, sessionController.checkAuth);

routes.post(
  '/foto',
  auth,
  multer(multerconfig).single('photo'),
  fotoController.store,
);
routes.delete('/foto', fotoController.delete);

module.exports = routes;

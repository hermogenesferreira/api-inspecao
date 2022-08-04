import { Router } from 'express';
import UserController from './controllers/UserController';
import CategoriaController from './controllers/CategoriaController';
import RoteiroController from './controllers/RoteiroController';
import RespostaController from './controllers/RespostaController';
import EstabelecimentoController from './controllers/EstabelecimentoController';
import InspecaoController from './controllers/InspecaoController';
import SessionController from './controllers/SessionController';
import auth from './middlewares/auth';
import AgendamentoController from './controllers/AgendamentoController';

const routes = new Router();

routes.post('/sessions', SessionController.create);
routes.post('/users', UserController.create);

routes.use(auth);

routes.get('/agendamento', AgendamentoController.index);
routes.get('/agendamento/:id', AgendamentoController.show);
routes.post('/agendamento', AgendamentoController.create);
routes.put('/agendamento/:id', AgendamentoController.update);
routes.delete('/agendamento/:id', AgendamentoController.destroy);

routes.get('/estabelecimento', EstabelecimentoController.index);
routes.get('/estabelecimento/:id', EstabelecimentoController.show);
routes.post('/estabelecimento', EstabelecimentoController.create);
routes.put('/estabelecimento/:id', EstabelecimentoController.update);
routes.delete('/estabelecimento/:id', EstabelecimentoController.destroy);

routes.get('/resposta', RespostaController.index);
routes.get('/resposta/:id', RespostaController.show);
routes.post('/resposta', RespostaController.create);
routes.put('/resposta/:id', RespostaController.update);
routes.delete('/resposta/:id', RespostaController.destroy);

routes.get('/inspecao', InspecaoController.index);
routes.get('/inspecao/:id', InspecaoController.show);
routes.post('/inspecao', InspecaoController.create);
routes.put('/inspecao/:id', InspecaoController.update);
routes.delete('/inspecao/:id', InspecaoController.destroy);

routes.get('/roteiro', RoteiroController.index);
routes.get('/roteiro/:id', RoteiroController.show);
routes.post('/roteiro', RoteiroController.create);
routes.put('/roteiro/:id', RoteiroController.update);
routes.delete('/roteiro/:id', RoteiroController.destroy);

routes.get('/categoria', CategoriaController.index);
routes.get('/categorias', CategoriaController.show);
routes.post('/categoria', CategoriaController.create);
routes.put('/categoria/:id', CategoriaController.update);
routes.delete('/categoria/:id', CategoriaController.destroy);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

export default routes;

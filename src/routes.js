const express = require('express');

const UserController = require('./controllers/UserController');
const VehicleController = require('./controllers/VehicleController');
const LocationController = require('./controllers/LocationController');
const InsuranceController = require('./controllers/InsuranceController');
const SmartController = require('./controllers/SmartController');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require('./middleware/auth');

const routes = express.Router();

routes.get('/users', UserController.index); // Lista os usuários
routes.post('/users', UserController.store); // Cria os usuários
routes.put('/users/:id', UserController.update); // Atualiza os usuários
routes.delete('/users/:id', UserController.delete);  // Deleta os usuários

routes.post('/sessions', SessionController.store);  // Inicia uma sessão

routes.get('/vehicles/:user_id', VehicleController.index); // Lista os veículos de determinado usuário
routes.post('/vehicles/:user_id', VehicleController.store); // Armazena o véiculo de um determinado usuário
routes.delete('/vehicles/:vehicle_id', VehicleController.delete); // Deleta um determinado veículo
routes.put('/vehicles/:vehicle_id', VehicleController.update); // Atualiza o status do seguro de um determinado veículo

routes.get('/locations/:vehicle_id', LocationController.index); // Lista todas as localizações de um determinado veículo
routes.post('/locations/:vehicle_id', LocationController.store); // Armazena as localizações de um determinado veículo
routes.get('/locations/current_location/:vehicle_id', LocationController.current_location) ;// Informa a localização atual de um determinado veículo

routes.get('/insurance', InsuranceController.allInsuranceStatus) // Lista todos os usuários com o seguro ativado
routes.get('/insurance/:user_id', InsuranceController.vehicleLastLocation) // Lista os veículos e sua ultima localização de um determinado usuário
routes.put('/insurance/:user_id', InsuranceController.updateCredits) // Atualiza os creditos do determinado usuário

routes.get('/smart_safe/:vehicle_id', SmartController.index) //
routes.post('/smart_safe/:vehicle_id', SmartController.store) //
routes.put('/smart_safe/:vehicle_id', SmartController.delete) //

module.exports = routes;

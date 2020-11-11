// Importando Bibliotecas, Arquivos e Configurações
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const porta = process.env.PORT || 3000
const api = express();
const router = express.Router();
const apiRoutes = require('./routes/apiRoutes');

api.use(cors());
api.use(bodyparser.urlencoded({extended: true}));
api.use(bodyparser.json({limit: '20mb', extended: true}));

router.get('/', (request, response) => response.json({
    mensagem: 'API Online!'
}));

api.use('/', router);
api.use('/api', apiRoutes);

api.listen(porta);
console.log('API funcionando na url: http://localhost:3000/');
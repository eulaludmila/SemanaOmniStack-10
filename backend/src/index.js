const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
require('dotenv').config()
const {setupWebSocket} = require('./websocket')

const app = express();

//extrair o servidor http fora do express
const server = http.Server(app)

setupWebSocket(server);

mongoose.connect(process.env.BANCO,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//liberar o acesso externo
//caso queira o acesso para todos, basta deixar apenas app.use(cors())
app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(routes);


// Métodos HTTP : get, post, put, delete

/* 
    Tipos de Parâmetros

    - Query Params: req.query(filtros, ordenação, paginação, ...)
    - Route Params: request.params(Identificar recurso na alteração ou exclusão)
    - Body: request.body (Dados para criação ou alteração de um registro)

*/



server.listen(3333)
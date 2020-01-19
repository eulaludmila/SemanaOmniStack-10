const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('cors')

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-mo2yz.mongodb.net/test?retryWrites=true&w=majority',{
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



app.listen(3333)
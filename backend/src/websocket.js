const secketio = require('socket.io');
const  parseStringAsArray = require('./utils/parseStringAsArray');
const  calculateDistance = require('./utils/calculateDistance');

let io;

//criar uma variável para salvar no nodejs um novo objeto de conexão
const connections = [];

//fazer configurações para o servdiro aceita o websocket
exports.setupWebSocket = (server) => {
   io = secketio(server);
    
    //toda vez que houver uma conexão
    io.on('connection', socket => {


        console.log("chegou")
        //recebendo os parâmetros do front-end
        const { latitude, longitude, techs} = socket.handshake.query;

        //Adicionar no array connection uma nova conexão
        connections.push({

            //socket.id = id aleatório
            id:socket.id,
            coordinates: {

                //transformar em Number
                latitude: Number(latitude),
                longitude: Number(longitude),
            },

            //transformar as techs em array
            techs: parseStringAsArray(techs),
        })

    });
    
};

//fazer filtro das conexões, recebendo as coordenadas desse novo dev cadastrado e as techs que ele trabalha
exports.findConnections = (coordinates, techs) => {
    console.log(connections)

    //retornando conexões que estão há 10km das coordinates do parâmetro e que estão  com as techs
    return connections.filter(connection => {
        //filtrar connections

        //comparando as coordenadas e as techs do novo dev cadastrado com as coordenadas e as techs armazenadas em cada uma da conexões do websocket
        return calculateDistance(coordinates, connection.coordinates) < 10 && connection.techs.some(item => techs.includes(item));
       
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connetion => {
        console.log(connetion.id)
        io.to(connetion.id).emit(message, data); 
    });
}
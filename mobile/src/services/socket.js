//configuração do websocket

import socketio from 'socket.io-client';
// import dotenv from 'dotenv';

// dotenv.config()

const socket = socketio(process.env.IP,{
    //não fazer conexão de forma automatica
    autoConnect:false
});

function subcribeToNewDevs(subcribeFunction){
    socket.on('new-dev', subcribeFunction);
}

function connect(latitude, longitude, techs){

    //enviar parametros para o back-end
    socket.io.opts.query = {
        latitude,
        longitude, 
        techs,
    }

    //conectar o socket
    socket.connect();

    console.log("chegou 2")

}


function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subcribeToNewDevs
};

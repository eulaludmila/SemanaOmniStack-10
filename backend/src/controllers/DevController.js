
const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    //fazendo busca do dev
    async index(req, res) {

        const devs = await Dev.find();

        return res.json(devs);
    },

    //cadastrar um dev no banco
    async store(request, response) {

        //pegar os parâmetros do corpo da requisição
        const { github_username, techs, latitude, longitude } = request.body;

        

        //verificar se o dev com determinado username já existe no banco de dados
        let dev = await Dev.findOne({ github_username });

        
        //se esse dev não existir
        if(!dev) {
            
            //irá buscar na api do github esse dev
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            
    
            // irá pegar as informações desse dev
            const { name = login, avatar_url, bio} = apiResponse.data;

            /*split - tirar as vírgulas // trim - espaços */
            //irá transformar a string de techs em array
            const techsArray = parseStringAsArray(techs);
        
            //pegará o local desse dev
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            
        
            //criando o dev no banco de dados
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs:techsArray,
                location
            })

            // console.log(techsArray)

            //filtrar as conexões que estão há no máximo 10km de distância e que o novo dev tenha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections( [latitude, longitude ], techsArray,);

            // console.log(sendSocketMessageTo)

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
            
            return response.json(dev);

        }
        else {

            return response.send('Já existe um cadastro com esse github_username');
        }
    
        
    }
}
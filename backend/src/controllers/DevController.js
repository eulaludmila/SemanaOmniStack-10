
const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')


module.exports = {

    async index(req, res) {

        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const { name = login, avatar_url, bio} = apiResponse.data;
            /*split - tirar as vírgulas // trim - espaços */
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs:techsArray,
                location
            })


            return response.json(dev)
        }else {
            return response.send('Já existe um acadastro com o github_username')
        }
    
        
    }
}
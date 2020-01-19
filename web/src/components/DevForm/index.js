import React, {useState, useEffect} from 'react';

function DevForm({ onSubmit }) {

    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    //dispararmos uma função toda vez que uma informação alterar
    //paramatro 1 = qual função deve chamar
    //parametro 2 = quando deve chamar
    useEffect(() => {

        //pega a latitude e a longitude do navegador
        navigator.geolocation.getCurrentPosition(
            //se der certo chamará essa função
            (position) => {
                const {latitude, longitude} = position.coords;

                setLatitude(latitude);
                setLongitude(longitude)
            },
            //se der erro chamará essa
            (err) => {
                console.log(err)
            },
            {
                timeout: 30000,
            }

        )

    }, []);

    //função para fazer o submit do formulário
    async function handleSubmit(e){
        e.preventDefault();

        //o retorno dela é chamando o onSubmit do DevForm
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });
        //passei os dados dos usuários

        setGithubUsername('');
        setTechs('')
    }


    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)}></input>
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologia</label>
                <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}></input>
            </div>
            
            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input type="number" name="latitude" id="latitude" required value={latitude}
                
                /*toda vez que muda o valor da latitude, vai pegar o evento e vai dar um setLatitude colocando o value do input*/
                onChange={e => setLatitude(e.target.value)}></input>
            </div>
            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input type="number" name="longitude" id="longitude" required value={longitude}onChange={e => setLongitude(e.target.value)}></input>
            </div>
            </div>
            <button type="submit">Salvar</button>
        
        </form>
    )
}

export default DevForm
import React, {Fragment, useState, useEffect} from 'react';
import './css/global.css'
import './css/App.css'
import './css/Sidebar.css'
import Eula from './img/gata.jpg'
import './css/Main.css'
import api from './services/api'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {

    const [devs, setDevs] = useState([]);


    
    //lembra o component didmount
    useEffect(() => {

        async function loadDevs() {
            const response = await api.get('/devs');
            setDevs(response.data)

            console.log(response.data)
        }

        loadDevs();

    }, [])

    //resposável por adicionar o dev no banco de dados
    async function handleAddDev(data) {

        const response = await api.post('/devs',data);

        setDevs([...devs, response.data])
            
    }
    

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev}/>
            </aside>
            <main>
            <ul>
                {devs.map(dev => (
                    <DevItem key={dev._id} dev={dev}/>
                ))}
                
            </ul>
        </main>
        </div>
    );
}

export default App;

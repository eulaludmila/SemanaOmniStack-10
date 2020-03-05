import React, {useEffect, useState} from 'react';
import {View,Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import {api} from '../services/api';
import {connect, disconnect, subcribeToNewDevs} from '../services/socket';



// 1º parâmetro - pedir permissões para o usuário para usar a localização
// 2º parâmetro - pegar a localização dousuário
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main({ navigation }){

    const [devs, setDevs] = useState([])
    const [ currentRegion, setCurrentRegion ] = useState(null);
    const [techs, setTechs] = useState('')

    //utilizado para executar ao iniciar os componentes na tela
    useEffect(() => {
        async function loadInitialPosition(){

            ///saber se deu permissão
            const { granted } = await requestPermissionsAsync();

            //se a foi dada a permissão
            if(granted) {

                //pegando as coordenadas
                const {coords} = await getCurrentPositionAsync({

                    //usar a localização do gps
                    //se for false, a localização será dada pelo wifi ou dados móveis
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                //colocando no estado de CurrentRegion
                setCurrentRegion({
                    latitude: -23.552204999999997,
                    longitude: -46.9513785,
                    latitudeDelta:0.04 ,
                    longitudeDelta:0.04,
                })

            }


           
        }

        loadInitialPosition();
    }, []);//com o [] vazio será executado apenas uma vez

    useEffect(() => {
        subcribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs])

    function setupWebSocket(){
        disconnect();

        const { latitude, longitude } = currentRegion;

        connect(
            latitude,
            longitude,
            techs
        );
    }

    //carregar os devs
    async function loadDevs(){

        //pegando a latitude e longitude que é colocada no estado currentRegion
        const {latitude, longitude} = currentRegion;

        //faço um requisição passando os seguintes parametros
        const response = await api.get('/search', {
            params:{
                latitude,
                longitude,
                techs
            },
        });

        //setando a resposta da api
        setDevs(response.data.devs);
        setupWebSocket();

    }

    //função para que cada vez que mudar a localização mapa, irá setar no estado do currentRegion
    function handleRegionChange(region){
        // console.log(region)
        setCurrentRegion(region);

    }

    if(!currentRegion) {
        return null;
    }

    //colocando um tamanho no mapa
    return (
        <>
            {/* onRegionChangeComplete - ao fazer mudança no mapa currentRegion*/}
            <MapView onRegionChangeComplete={handleRegionChange} initialRegion={currentRegion} style={styles.map}>

                {devs.map(dev => (
                    
                    //Fazer marcação no mapa com a latitude e longitude
                    <Marker key={dev._id} coordinate={{latitude: dev.location.coordinates[1], longitude:dev.location.coordinates[0]}}>
                        <Image style={styles.avatar} source={{uri: dev.avatar_url}}></Image>
                        <Callout onPress={() => {
                            //navegação
                            navigation.navigate('Profile', {github_username: dev.github_username})
                            //usado para fazer a rota, toda página recebe por padrao
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}> {dev.techs.join(', ')} </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
                
            </MapView>
            <View style={styles.searchForm}>
                <TextInput style={styles.searchInput} placeholder="Buscar devs por techs..." placeholderTextColor="#999"
                autoCapitalize="words" autoCorrect={false} value={techs} onChangeText={text => setTechs(text)}/>
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton} >
                    <MaterialIcons name="my-location" size={20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </>
    )
    
    
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height:54,
        borderRadius:4,
        borderWidth:4,
        borderColor:"#FFF"
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight:"bold",
        fontSize: 16,
    },
    devBio: {
        color: "#666",
        marginTop:5,
    },
    devTechs:{
        marginTop:5,
    },
    searchForm: {
        position:'absolute',
        top: 20,
        left:20,
        right:20,
        zIndex:5,
        display:'flex',
        flexDirection:'row',
    },
    searchInput: {
        flex:1,
        height:50,
        backgroundColor:'#fff',
        color:"#333",
        borderRadius:25,
        paddingHorizontal:20,
        fontSize:16,
        shadowColor:"#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width:4,
            height:4,
        },
        elevation:2,
    },

    loadButton:{
        width: 50,
        height:50,
        backgroundColor:"#8e4dff",
        borderRadius:25,
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:15,
    },

})

export default Main;

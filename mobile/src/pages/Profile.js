import React from 'react';
import {View} from 'react-native';
import { WebView } from 'react-native-webview'

function Profile({navigation}){

    //pegando o parametro da rota que estou recebendo
    const githubUsername = navigation.getParam('github_username');

    return <WebView style={{flex : 1}} source={{uri: `https://github.com/${githubUsername}`}} />
    
}

export default Profile;
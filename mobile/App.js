import React from 'react';
import { StyleSheet, Text, View, StatusBar, YellowBox } from 'react-native';


import Routes from './src/routes'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      {/* estilizando a toolbar, colocando os elementos de cor claro e a cor de fundo */}
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes/>
    </>
  );
}

//criando o css
//não existe herança de css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title:{
    fontWeight:"bold",
    color:"#FFF",
    fontSize:31,
  },
});

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        //fazer configuração nessa tela
        Main: {
            //qual a tela
            screen: Main,
            //outras opções
            navigationOptions: {
                //titulo do navigation
                title:"DevRadar",
                //alinhamento
                headerTitleAlign:"center",
                
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title:"Perfil no GitHub",
                headerTitleAlign:"center"
            }
        },
    }, {
        //configuração para todas as telas
        defaultNavigationOptions: {

            //não ter nome na seta de voltar
            headerBackTitleVisible:false,
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor:"#7D40E7",
                
            }
        }
    })
);

export default Routes;
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import WelcomeScreen from '../screens/Welcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JugadoresScreen from '../screens/JugadoresScreen';
import JuegoScreen from '../screens/JuegoScreen';
import PuntuacionScreen from '../screens/PuntuacionScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Welcome'>
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Registro" component={RegistroScreen} />
      <Tab.Screen name='Jugadores' component={JugadoresScreen} />
      <Tab.Screen name='Juego' component={JuegoScreen} />
      <Tab.Screen name='Puntuacion' component={PuntuacionScreen} />
    </Tab.Navigator>
  );
}



export default function TabNavigator(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    )
}
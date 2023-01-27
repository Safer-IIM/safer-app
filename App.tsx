import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connexion from './src/pages/Connexion';
import Inscription from './src/pages/Inscription';
import ForgotPassword from './src/pages/ForgotPassword';
import Main from './src/pages/Main';
import Help from './src/pages/Help';

function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Home" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
import Connexion from './src/pages/Connexion';
import Inscription from './src/pages/Inscription';
import ForgotPassword from './src/pages/ForgotPassword';
import Main from './src/pages/Main';
import Help from './src/pages/Help';
import Account from './src/pages/Account';
import CallPage from './src/pages/CallPage';

function App() {
  const Stack = createNativeStackNavigator();
  return (
  // <View style={styles.container}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Connexion" component={Connexion} />
          <Stack.Screen name="Inscription" component={Inscription} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Call" component={CallPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;

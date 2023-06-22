import React, { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Context } from './src/context/index';
import Connexion from './src/pages/Connexion';
import Inscription from './src/pages/Inscription';
import ForgotPassword from './src/pages/ForgotPassword';
import Main from './src/pages/Main';
import Help from './src/pages/Help';
import Account from './src/pages/Account';
import CallPage from './src/pages/CallPage';
import { initialState, reducer } from './src/reducer/reducer';

function App() {
  const [isRecording, isRecordingDispatch] = useReducer(reducer, initialState);
  const Stack = createNativeStackNavigator();
  console.log('isRecording', isRecording)
  return (
    // <View style={styles.container}>
    <Context.Provider value={{
      isRecordingState: isRecording.isRecording,
      isRecordingDispatch,
    }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
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
    </Context.Provider>
  );
}
export default App;

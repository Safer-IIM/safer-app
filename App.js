import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import ForgotPassword from "./pages/ForgotPassword";
import Main from "./pages/Main";

import Help from "./pages/Help";
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
    // </View>
  );
};
export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

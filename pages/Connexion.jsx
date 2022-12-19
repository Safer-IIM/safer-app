import { Text, View } from "react-native";
import styles from "../style/inscription";
import LoginForm from "../components/LoginForm";

const Connexion = ({ navigation }) => {
  return (
    <View style={styles.inscriptionContainer}>
      <Text style={styles.title}>Welcome to Safer</Text>
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default Connexion;

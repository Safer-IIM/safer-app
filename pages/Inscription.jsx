import { Text, View } from "react-native";
import styles from "../style/inscription";
import LoginForm from "../components/LoginForm";

const Inscription = () => {
  return (
    <View style={styles.inscriptionContainer}>
      <Text style={styles.title}>Welcome to Safer</Text>
      <LoginForm />
    </View>
  );
};

export default Inscription;

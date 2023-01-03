import { Pressable, View, Text } from "react-native";
import styles from "../style/help";

const Help = () => {
  return (
    <View style={styles.helpContainer}>
      <Pressable style={styles.helpButton}>
        <Text style={styles.textAlert}>Appel d'urgence</Text>
      </Pressable>
    </View>
  );
};
export default Help;

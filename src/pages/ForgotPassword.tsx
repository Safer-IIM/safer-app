import { TextInput, Pressable, Text, View } from "react-native";
import styles from "../../styles/input";
const ForgotPassword = () => {
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(name, text)}
        type="email"
        placeholder={"Votre Email"}
      />
    </>
  );
};
export default ForgotPassword;

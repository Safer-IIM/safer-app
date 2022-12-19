import { TextInput, Pressable, Text, View } from "react-native";
import styles from "../style/input";

const Input = ({
  defaultValue,
  name,
  type,
  handleSubmit,
  onSubmit,
  setValue,
}) => {
  return (
    <>
      {type === "text" ? (
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue(name, text)}
          type={type}
          placeholder={defaultValue}
        />
      ) : (
        <Pressable
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          type={type}
        >
          <Text>{name}</Text>
        </Pressable>
      )}
    </>
  );
};
export default Input;

import { TextInput, Pressable, Text, View } from "react-native";
import styles from "../style/input";

const FormInput = ({
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
export default FormInput;

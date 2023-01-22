import { TextInput, Pressable, Text, View } from "react-native";
import styles from "../style/input";

const FormInput = ({
  defaultValue,
  name,
  type,
  handleSubmit,
  onSubmit,
  setValue,
  register,
}) => {
  return (
    <>
      {type !== "submit" ? (
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue(name, text)}
          type={type}
          placeholder={defaultValue}
          secureTextEntry={type === "password" ? true : false}
          {...register(name, { required: ` ${name} is required` })}
        />
      ) : (
        <Pressable
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          type={type}
        >
          <Text style={{ color: "white" }}>{defaultValue}</Text>
        </Pressable>
      )}
    </>
  );
};
export default FormInput;

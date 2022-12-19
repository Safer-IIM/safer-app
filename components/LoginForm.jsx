import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import styles from "../style/inscription";
import FormInput from "./FormInput";

const LoginForm = () => {
  const { register, setValue, handleSubmit, errors } = useForm();

  const onSubmit = (data) => console.log(data);

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <View style={styles.form}>
      <FormInput
        name={"email"}
        defaultValue="email"
        type="text"
        onChange={onChange}
        setValue={setValue}
      />
      <FormInput
        name={"password"}
        defaultValue="password"
        type="text"
        onChange={onChange}
        setValue={setValue}
      />
      <FormInput
        name={"Envoyer"}
        type="submit"
        onChange={onChange}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
      <View>
        <Text>Mot de passe oublié ?</Text>
      </View>
    </View>
  );
};

export default LoginForm;

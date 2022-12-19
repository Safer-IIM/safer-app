import { useForm } from "react-hook-form";
import { View } from "react-native";
import styles from "../style/inscription";
import Input from "./Input";

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
      <Input
        name={"email"}
        defaultValue="email"
        type="text"
        onChange={onChange}
        setValue={setValue}
      />
      <Input
        name={"password"}
        defaultValue="password"
        type="text"
        onChange={onChange}
        setValue={setValue}
      />
      <Input
        name={"Envoyer"}
        type="submit"
        onChange={onChange}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default LoginForm;

import { useForm } from "react-hook-form";
import React from "react";
import { View, Text } from "react-native";
import styles from "../style/inscription";
import FormInput from "./FormInput";

const LoginForm = ({ navigation }) => {
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
        name="Mot de passe"
        defaultValue="Mot de passe"
        type="text"
        onChange={onChange}
        setValue={setValue}
      />
      <FormInput
        name={"Se connecter"}
        type="submit"
        onChange={onChange}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
      <View>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("forgotPassword")}
        >
          Mot de passe oublié ?
        </Text>
        <Text
          style={styles.donthaveAccount}
          onPress={() => navigation.navigate("Inscription")}
        >
          Vous n'avez pas de compte ?
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;

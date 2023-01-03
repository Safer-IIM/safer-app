import { useForm } from "react-hook-form";
import React from "react";
import { View, Text } from "react-native";
import styles from "../style/inscription";
import FormInput from "./FormInput";

const LoginForm = ({ navigation }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    navigation.navigate("help");
  };
  return (
    <View style={styles.form}>
      <FormInput
        name={"email"}
        defaultValue="email"
        type="text"
        setValue={setValue}
        register={register}
      />
      {errors.email && <Text>{errors.email?.message}</Text>}
      <FormInput
        name="password"
        defaultValue="Mot de passe"
        type="password"
        setValue={setValue}
        register={register}
      />
      {errors.password && <Text>{errors.password?.message}</Text>}
      <FormInput
        name={"SignUp"}
        defaultValue="Se connecter"
        type="submit"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        navigation={navigation}
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

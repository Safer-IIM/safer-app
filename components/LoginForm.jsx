import React from "react";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import styles from "../style/inscription";
import FormInput from "./FormInput";
import { login } from "../api/user";
import { storeData } from "../utils/store";

const LoginForm = ({ navigation }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await login(data.email, data.password)
      .then(function (response) {
        storeData("@userToken", response.data.token);
        navigation.navigate("Main", {
          userToken: response.data.token,
        });
      })
      .catch(function (error) {
        console.log("error :", error);
      });
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

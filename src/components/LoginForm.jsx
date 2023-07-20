/* eslint-disable react/prop-types */
import React from "react";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import jwt_decode from "jwt-decode";
import styles from "../../styles/inscription";
import FormInput from "./FormInput";
import { loginUser } from "../../api/user";
import { storeData } from "../../utils/store";

function LoginForm({ navigation }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const token = await loginUser({ email, password });
      const decoded = jwt_decode(token);
      await storeData("@userToken", token);
      await storeData("@userInfo", decoded);
      await storeData("@isConnected", true);
      navigation.navigate("Main", {
        userToken: token,
      });
    } catch (e) {
      console.log("test");
      setError("user", {
        type: "focus",
        message: "Email ou mot de passe invalide",
      });
    }
  };

  return (
    <View style={styles.form}>
      <FormInput
        name="email"
        defaultValue="email"
        type="text"
        setValue={setValue}
        register={register}
      />
      {errors.email && (
        <Text style={{ color: "red" }}>{errors.email?.message}</Text>
      )}
      <FormInput
        name="password"
        defaultValue="Mot de passe"
        type="password"
        setValue={setValue}
        register={register}
      />
      {errors.password && (
        <Text style={{ color: "red" }}>{errors.password?.message}</Text>
      )}
      <FormInput
        name="SignUp"
        defaultValue="Se connecter"
        type="submit"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
      {errors.user && (
        <Text style={{ color: "red" }}>{errors.user?.message}</Text>
      )}
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
          Vous n&#39;avez pas de compte ?
        </Text>
      </View>
    </View>
  );
}

export default LoginForm;

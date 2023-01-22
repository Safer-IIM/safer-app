import { useForm } from "react-hook-form";
import React from "react";
import { View, Text } from "react-native";
import styles from "../style/inscription";
import FormInput from "./FormInput";
import { register } from "../api/user";

const RegisterForm = ({ navigation }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await register(data.name, data.email, data.password)
      .then(function (response) {
        // en cas de réussite de la requête
        console.log("response :", response);
      })
      .catch(function (error) {
        // en cas d’échec de la requête
        console.log("error :", error);
      });
  };

  return (
    <View style={styles.form}>
      <FormInput
        name={"name"}
        defaultValue="nom"
        type="text"
        setValue={setValue}
        register={register}
      />
      {errors?.name && <Text>{errors.name?.message}</Text>}
      <FormInput
        name={"email"}
        defaultValue="email"
        type="email"
        setValue={setValue}
        register={register}
      />
      {errors?.email && <Text>{errors.email?.message}</Text>}
      <FormInput
        name="password"
        defaultValue="Mot de passe"
        type="password"
        setValue={setValue}
        register={register}
      />
      {errors?.password && <Text>{errors.password?.message}</Text>}
      <FormInput
        name="confirmPassword"
        defaultValue="Confirmer le mot de passe"
        type="password"
        setValue={setValue}
        register={register}
      />
      {errors?.confirmPassword && (
        <Text>{errors.confirmPassword?.message}</Text>
      )}

      <FormInput
        name={"SignIn"}
        defaultValue="S'enregistrer"
        type="submit"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
      <View>
        <Text
          style={styles.donthaveAccount}
          onPress={() => navigation.navigate("Home")}
        >
          Vous avez deja un compte ?
        </Text>
      </View>
    </View>
  );
};

export default RegisterForm;

import { useForm } from "react-hook-form";
import React from "react";
import { View, Text } from "react-native";
import styles from "../style/inscription";
import FormInput from "./FormInput";

const RegisterForm = ({ navigation }) => {
  const { register, setValue, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log("errors :");
    console.log("errors :", errors);
    console.log(data);
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
      {errors.name && <Text>{errors.name?.message}</Text>}
      <FormInput
        name={"email"}
        defaultValue="email"
        type="email"
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
        name="confirmPassword"
        defaultValue="Confirmer le mot de passe"
        type="password"
        setValue={setValue}
        register={register}
      />
      {errors.password && <Text>{errors.password?.message}</Text>}

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

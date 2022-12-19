import { useForm } from "react-hook-form";
import React from "react";
import { View, Text } from "react-native";
import styles from "../style/inscription";
import FormInput from "./FormInput";

const RegisterForm = ({ navigation }) => {
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
        name={"nom"}
        defaultValue="nom"
        type="text"
        onChange={onChange}
        setValue={setValue}
      />
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
        name={"S'enregistrer"}
        type="submit"
        onChange={onChange}
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

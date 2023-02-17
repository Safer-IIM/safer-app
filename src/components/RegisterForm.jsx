/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/inscription';
import FormInput from './FormInput';
import {loginUser, registerUser} from '../../api/user';
import {storeData} from "../../utils/store";

function RegisterForm({ navigation }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then(async (response) => {
          const token = await loginUser({ email : data.email, password :data.password });
          await storeData('@userToken', token);
          await storeData('@fromLoginPage', true);
          navigation.navigate('Main', {
              userToken: token,
          });

        // navigation.navigate("Main");
          await storeData('@fromLoginPage', true);
        console.log('response :', response);
      })
      .catch((error) => {
        console.log('error :', error);
      });
  };

  return (
    <View style={styles.form}>
      <FormInput
        name="name"
        defaultValue="nom"
        type="text"
        setValue={setValue}
        register={register}
      />
      {errors?.name && <Text>{errors.name?.message}</Text>}
      <FormInput
        name="email"
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
        name="SignIn"
        defaultValue="S'enregistrer"
        type="submit"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
      <View>
        <Text
          style={styles.donthaveAccount}
          onPress={() => navigation.navigate('Connexion')}
        >
          Vous avez deja un compte ?
        </Text>
      </View>
    </View>
  );
}

export default RegisterForm;

/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/inscription';
import FormInput from './FormInput';
import { registerUser } from '../../api/user';

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
      .then((response) => {
        // navigation.navigate("Main");
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

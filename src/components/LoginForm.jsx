/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import styles from '../../styles/inscription';
import FormInput from './FormInput';
import { loginUser } from '../../api/user';
import { storeData } from '../../utils/store';

function LoginForm({ navigation }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await loginUser({ email: data.email, password: data.password })
      .then((response) => {
        if (response.data.token) {
          storeData('@userToken', response.data.token);
          navigation.navigate('Main', {
            userToken: response.data.token,
          });
        } else {
          register('user', { required: 'Email ou mot de passe invalide' });
        }
      })
      .catch((error) => error);
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
        name="SignUp"
        defaultValue="Se connecter"
        type="submit"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
      {errors.user && <Text>{errors.user?.message}</Text>}
      <View>
        <Text style={styles.forgotPassword} onPress={() => navigation.navigate('forgotPassword')}>
          Mot de passe oublié ?
        </Text>
        <Text style={styles.donthaveAccount} onPress={() => navigation.navigate('Inscription')}>
          Vous n&#39;avez pas de compte ?
        </Text>
      </View>
    </View>
  );
}

export default LoginForm;

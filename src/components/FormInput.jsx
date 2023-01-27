/* eslint-disable react/prop-types */
import React from 'react';
import {
  TextInput, Pressable, Text,
} from 'react-native';
import styles from '../../styles/input';

function FormInput({
  defaultValue,
  name,
  type,
  handleSubmit,
  onSubmit,
  setValue,
  register,
}) {
  return (
    type !== 'submit' ? (
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(name, text)}
        type={type}
        placeholder={defaultValue}
        secureTextEntry={type === 'password'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name, { required: ` ${name} is required` })}
      />
    ) : (
      <Pressable
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        type={type}
      >
        <Text style={{ color: 'white' }}>{defaultValue}</Text>
      </Pressable>
    )
  );
}
export default FormInput;

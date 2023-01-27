import React from 'react';
import {
  TextInput,
} from 'react-native';
import styles from '../../styles/input';

function ForgotPassword() {
  return (
    <TextInput
      style={styles.input}
      onChangeText={(text) => setValue(text)}
      placeholder="Votre Email"
    />
  );
}
export default ForgotPassword;

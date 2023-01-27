import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/inscription';
import RegisterForm from '../components/RegisterForm';

// eslint-disable-next-line react/prop-types
function Inscription({ navigation }) {
  return (
    <View style={styles.inscriptionContainer}>
      <Text style={styles.title}>Welcome to Safer</Text>
      <RegisterForm navigation={navigation} />
    </View>
  );
}
export default Inscription;

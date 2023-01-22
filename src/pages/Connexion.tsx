import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/inscription';
import LoginForm from '../components/LoginForm';

// eslint-disable-next-line react/prop-types
function Connexion({ navigation }) {
  return (
    <View style={styles.inscriptionContainer}>
      <Text style={styles.title}>Welcome to Safer</Text>
      <LoginForm navigation={navigation} />
    </View>
  );
}

export default Connexion;

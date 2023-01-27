/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../styles/main';

function AlertButton({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Button style={styles.alertButton} mode="contained" onPress={() => console.log('Pressed')}>
        Urgence
      </Button>
    </View>
  );
}

export default AlertButton;

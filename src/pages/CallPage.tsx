/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import {
  ImageBackground, Platform, Text, View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton } from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Audio } from 'expo-av';
import styles from '../../styles/callPage';
import image from '../../assets/call.jpg';

function CallPage({ navigation }) {
  const [sound, setSound] = useState();
  const [isplaying, setIsplaying] = useState();
  const deviceOS = Platform.OS;
  // const image = { uri: '../../assets/call.jpg' };

  async function handleSound() {
    if (isplaying) {
      await sound.pauseAsync();
      setIsplaying(false);
    } else {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(require('../../assets/tiktok.mp3'));
      setSound(sound);
      setIsplaying(true);
      await sound.playAsync();
    }
  }
  useEffect(() => (sound
    ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    }
    : undefined), [sound]);

  useEffect(() => (deviceOS === 'ios' ? console.log('Device is IOS') : console.log('Device is Android')), []);

  return (
    <View style={styles.callPageContainer}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>

        {isplaying ? (
          <IconButton
            icon="pause"
            mode="contained"
            style={styles.resumeButton}
            onPress={() => {
              navigation.navigate('Main');
            }}
          />
        ) : (
          <IconButton
            icon="play"
            mode="contained"
            style={styles.resumeButton}
            onPress={() => {
              navigation.navigate('Main');
            }}
          />
        )}

        <IconButton
          icon="phone-hangup"
          mode="contained"
          style={styles.hangUpButton}
          onPress={() => {
            navigation.navigate('Main');
          }}
        />

      </ImageBackground>
    </View>
  );
}
export default CallPage;

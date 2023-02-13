/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import {
  ImageBackground, Platform, Text, View, Animated,
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
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
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

  function fadeAnimation() {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });
    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    });

    return Animated.loop(Animated.sequence([fadeIn, fadeOut]), -1).start();
  }

  useEffect(() => {
    fadeAnimation();
  }, [fadeAnim]);

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

        <Animated.View // Special animatable View
          style={{
            position: 'absolute',
            bottom: '11%',
            opacity: fadeAnim, // Bind opacity to animated value
          }}
        >
          <IconButton
            icon="phone-hangup"
            mode="contained"
            style={styles.hangUpButton}
            onPress={() => {
              navigation.navigate('Main');
            }}
          />
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
export default CallPage;

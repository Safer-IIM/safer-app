/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Platform, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Audio } from 'expo-av';

function CallPage({ navigation }) {
  const [sound, setSound] = useState();
  const [isplaying, setIsplaying] = useState();
  const deviceOS = Platform.OS;

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

  useEffect(() => {
    Platform.OS === 'ios' ? console.log('Device is IOS') : console.log('Device is Android');
  }, []);

  return (
    <View>
      <Button mode="contained" onPress={() => handleSound()}>{isplaying ? 'Pause' : 'Play'}</Button>
      <Button
        onPress={() => {
          navigation.navigate('Main');
        }}
      >
        back
      </Button>
      <Text>
        {deviceOS === 'ios' ? 'IOS' : 'Android'}
      </Text>
    </View>
  );
}
export default CallPage;

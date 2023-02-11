import { View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Audio } from 'expo-av';

function CallPage() {
  const [sound, setSound] = useState();
  const [isplaying, setIsplaying] = useState();
  const audioRef = useRef(null);

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

  return (
    <View>
      <Button onPress={() => handleSound()}>{isplaying ? 'Pause' : 'Play'}</Button>
    </View>
  );
}
export default CallPage;

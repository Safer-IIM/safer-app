/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { ImageBackground, Platform, Text, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton } from "react-native-paper";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Audio } from "expo-av";
import styles from "../../styles/callPage";
import image from "../assets/call.jpg";
import { getData } from "../../utils/store";
import { postAlert } from "../../api/user";

function CallPage({ navigation }) {
  const [loadedSound, setLoadedSound] = useState<any>();
  const [isplaying, setIsplaying] = useState<boolean>();
  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial value for opacity: 0
  const deviceOS = Platform.OS;
  //  const image = { uri: "../assets/call.jpg" };

  async function handleSound() {
    if (isplaying) {
      await loadedSound.pauseAsync();
      setIsplaying(false);
    } else {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/tiktok.mp3")
      );
      setLoadedSound(sound);
      setIsplaying(true);
      await sound.playAsync();
    }
  }
  useEffect(
    () =>
      loadedSound
        ? () => {
            console.log("Unloading Sound");
            loadedSound.unloadAsync();
          }
        : undefined,
    [loadedSound]
  );

  useEffect(
    () =>
      deviceOS === "ios"
        ? console.log("Device is IOS")
        : console.log("Device is Android"),
    []
  );

  useEffect(() => {
    handleSound();
  }, []);

  function fadeAnimation() {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });
    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 2000,
      useNativeDriver: true,
    });
    Animated.loop(Animated.sequence([fadeIn, fadeOut])).start();
  }

  useEffect(() => {
    fadeAnimation();
  }, [fadeAnim]);

  return (
    <View style={styles.callPageContainer}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
        <Animated.View // Special animatable View
          style={{
            position: "absolute",
            bottom: "40%",
            opacity: fadeAnim, // Bind opacity to animated value
          }}
        >
          {/* isplaying ? (
            <IconButton
              icon="play"
              mode="contained"
              style={styles.resumeButton}
              onPress={() => {
                navigation.navigate('Main');
              }}
            />
          ) : (
            <IconButton
              icon="pause"
              mode="contained"
              style={styles.resumeButton}
              onPress={() => {
                navigation.navigate('Main');
              }}
            />
          ) */}
        </Animated.View>
        <Animated.View // Special animatable View
          style={{
            position: "absolute",
            bottom: "11.8%",
            opacity: fadeAnim, // Bind opacity to animated value
          }}
        >
          <IconButton
            iconColor="white"
            icon="phone-hangup"
            mode="contained"
            style={styles.hangUpButton}
            onPress={() => {
              navigation.navigate("Main");
            }}
          />
        </Animated.View>
      </ImageBackground>
      <Button
        icon="phone"
        mode="contained"
        onPress={async () =>
          postAlert(
            await getData("@userInfo"),
            await getData("@userToken", "string")
          )
            .then((res) => console.log("res :", res.data))
            .catch((res) => console.log(" err :", res.data))
        }
        style={styles.emergencyButton}
      >
        Cliquez pour passer un appel d'urgence
      </Button>
    </View>
  );
}
export default CallPage;

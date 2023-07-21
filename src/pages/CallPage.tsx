/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import {
  ImageBackground,
  Platform,
  View,
  Animated,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Button, IconButton } from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import { Audio } from "expo-av";
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, BUCKET_NAME } from "@env";
import * as FileSystem from "expo-file-system";
import jwt_decode from "jwt-decode";
import { S3 } from "aws-sdk";
import { Buffer } from "buffer";
import { ManagedUpload } from "aws-sdk/clients/s3";
// eslint-disable-next-line import/no-extraneous-dependencies
import styles from "../../styles/callPage";
import image from "../assets/call.jpg";
import { getData } from "../../utils/store";
import { postAlert } from "../../api/user";
import { Context } from "../context";
import { ACTIONS } from "../reducer/reducer";
import { sendRecord } from "../../api/record";
import { generateNameVideo, getVideoContentType } from "../../utils/utils";

const soundLink = [
  require("../assets/Sound.m4a"),
  require("../assets/Sound2.m4a"),
  require("../assets/Sound3.m4a"),
  require("../assets/Sound4.m4a"),
];

function CallPage({ navigation }) {
  const [loadedSound, setLoadedSound] = useState<any>();
  const [isplaying, setIsplaying] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isRecording, setIsRecording] = useState(false);
  const [audioRecording, setAudioRecording] = useState(null);
  const [deviceOS, setDeviceOS] = useState(Platform.OS);
  const [stepSound, setStepSound] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial value for opacity: 0

  const [cameraRef, setCameraRef] = useState<any>(null);

  const s3 = new S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });

  useEffect(() => {
    if (!isplaying && isSpeaking) {
      setTimeout(() => {
        setIsSpeaking(false);
        handleSound(stepSound);
      }, 1000);
    } else {
      setIsSpeaking(false);
    }
  }, [isSpeaking]);

  const onRecordingStatusUpdate = (e) => {
    if (e.metering > -20) {
      setIsSpeaking(true);
    }
  };

  const onAudioPlayingStatusUpdate = ({ didJustFinish }) => {
    if (didJustFinish) {
      console.log("didJustFinish", didJustFinish);
      setIsplaying(false);
    }
  };
  //   await recording.stopAndUnloadAsync();
  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        onRecordingStatusUpdate
      );
      setAudioRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  const pressCall = () => {
    const url = "tel://0782962651";
    Linking.openURL(url);
  };

  async function pauseSound() {
    if (isplaying) {
      await loadedSound.pauseAsync();
      setIsplaying(false);
    }
  }
  async function handleSound(index = 0) {
    const { sound } = await Audio.Sound.createAsync(soundLink[index]);
    sound.setOnPlaybackStatusUpdate(onAudioPlayingStatusUpdate);
    await sound.playAsync();
    setStepSound(() => index + 1);
    setLoadedSound(sound);
    setIsplaying(true);
  }

  async function takeVideo() {
    if (cameraPermission) {
      if (isRecording) {
        console.log("already recording");
      } else {
        console.log("[recording]");
        setIsRecording(true);
        if (cameraRef) {
          const recordData = await cameraRef.recordAsync({
            maxDuration: 5,
          });
          const { exists, uri } = await FileSystem.getInfoAsync(recordData.uri);

          if (exists) {
            const videoContent = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            console.log("[buffering ...]");
            /*
            const buffer = Buffer.from(
              videoContent,
              FileSystem.EncodingType.Base64
            );
            const uploadParams = {
              Bucket: BUCKET_NAME,
              Key: `${generateNameVideo()}.${uri.split(".")[1]}`,
              Body: buffer,
              ContentType: await getVideoContentType(uri),
            };
            console.log("[uploading to aws...]", uploadParams);

            s3.upload(
              uploadParams,
              async (err: any, responseAws: ManagedUpload.SendData) => {
                // isRecordingDispatch({ type: ACTIONS.STOP_RECORDING });
                if (err) {
                  console.log("Error while uploading the video :", err);
                } else {
                  console.log("Video successfully uploaded :", responseAws);
                  const dataRecord = {
                    name: responseAws.Key,
                    locationUrl: responseAws.Location,
                    device: Platform.OS,
                  };
                  await sendRecord(dataRecord);
                }
              }
            );
            */
          } else {
            console.error("Error file does not exists");
          }
        } else {
          console.log("pas de camera");
        }
      }
    }
  }

  const stopCall = async () => {
    isRecording && cameraRef.stopRecording();
    loadedSound && loadedSound.unloadAsync();
    if (audioRecording) {
      await audioRecording.stopAndUnloadAsync();
    }
    navigation.navigate("Main");
    setIsRecording(false);
  };

  useEffect(() => {
    console.log("build");
    if (deviceOS === "ios") {
      console.log("Device is IOS");
    } else {
      console.log("Device is Android");
    }
    (async () => {
      await takeVideo();
      await startRecording();
      await handleSound(stepSound);
    })();

    return () => {
      stopCall();
    };
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      setCameraPermission(await getData("@cameraPermission"));
      setAudioPermission(await getData("@audioPermission"));
    };
    getPermissions();
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
      <Camera
        style={{
          height: 300,
          width: 300,
          position: "absolute",
          opacity: 0,
        }}
        ref={(ref) => setCameraRef(ref)}
        type={type}
        onCameraReady={() => setIsCameraReady(true)}
      />
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
              stopCall();
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
            .then((res) => pressCall())
            .catch((res) => pressCall())
        }
        style={styles.emergencyButton}
      >
        Passer un VRAI appel d'urgence
      </Button>
    </View>
  );
}
export default CallPage;

/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { ImageBackground, Platform, View, Animated } from "react-native";
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

function CallPage({ navigation }) {
  const [loadedSound, setLoadedSound] = useState<any>();
  const [isplaying, setIsplaying] = useState<boolean>();
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isRecording, setIsRecording] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial value for opacity: 0

  const [cameraRef, setCameraRef] = useState<any>(null);
  const deviceOS = Platform.OS;
  const s3 = new S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });

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

  useEffect(() => {
    deviceOS === "ios"
      ? console.log("Device is IOS")
      : console.log("Device is Android");
    handleSound();
    () => {
      isRecording && cameraRef.stopRecording();
      loadedSound && loadedSound.unloadAsync();
    };
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      setCameraPermission(await getData("@cameraPermission"));
      setAudioPermission(await getData("@audioPermission"));
    };
    getPermissions();
  }, []);

  useEffect(() => {
    if (cameraPermission && audioPermission) {
      takeVideo();
    }
  }, [cameraPermission, audioPermission]);

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
        style={{ height: 300, width: 300, position: "absolute", opacity: 0 }}
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
              navigation.navigate("Main");
              setIsRecording(false);
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

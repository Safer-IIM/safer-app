/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import jwt_decode from "jwt-decode";
import { S3 } from "aws-sdk";
import { Buffer } from "buffer";
import { Text, View, Pressable, Platform } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  Button,
  IconButton,
  Dialog,
  Portal,
  List,
  MD3Colors,
} from "react-native-paper";
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, BUCKET_NAME } from "@env";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { getUser } from "../../api/user";
import AlertButton from "../components/AlertButton";
import styles from "../../styles/home";
import { getData, storeData } from "../../utils/store";
import Contact from "../components/contact/Contact";

import { generateNameVideo, getVideoContentType } from "../../utils/utils";
import { ACTIONS } from "../reducer/reducer";
import { Context } from "../context";
import { scenarios } from "../../utils/scenarios";
import { sendRecord } from "../../api/record";
import Footer from "../components/Footer";

function Main({ route, navigation }) {
  const [isUserConnected, setIsUserConnected] = useState(false);

  const isFocused = useIsFocused();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null);
  // const [isRecording, setIsRecording] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<any>(null);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const context = useContext(Context);
  const {
    isRecordingState,
    isRecordingDispatch,
    isAuthenticatedState,
    isAuthenticatedDispatch,
  } = context;

  const s3 = new S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });

  const cameraPermisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraRequestPermission =
      await Camera.requestCameraPermissionsAsync();
    const audioRequestPermission = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    setAudioPermission(audioRequestPermission.status === "granted");
    setCameraPermission(cameraRequestPermission.status === "granted");
  };

  const getUserInfo = async () => {
    const token = await getData("@userToken", "string");
    const decoded: any = jwt_decode(token);
    return getUser(decoded.user.id, token);
  };

  async function takeVideo() {
    if (cameraPermission) {
      if (isRecordingState) {
        console.log("already recording");
      } else {
        console.log("[recording]");
        isRecordingDispatch({ type: ACTIONS.RECORDING });
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
                isRecordingDispatch({ type: ACTIONS.STOP_RECORDING });
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
    if (cameraRef && cameraRef.current) {
      if (!isRecordingState) {
        console.log("[cameraRef stopping recording]");
        cameraRef.stopRecording();
      }
    }
  }, [isRecordingState]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await cameraPermisionFunction();
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const isConnected = await getData("@isConnected");
      const fromLoginPage = await getData("@fromLoginPage");
      if (isFocused && (!isConnected || fromLoginPage)) {
        getUserInfo()
          .then((res) => {
            storeData("@fromLoginPage", false);
            storeData("@userInfo", res.data);
            storeData("@isConnected", true);
            isAuthenticatedDispatch(true);
          })
          .catch((err) => {
            storeData("@fromLoginPage", false);
            isAuthenticatedDispatch(false);
            storeData("@isConnected", false);
          });
      }
    })();
  }, [isFocused]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.mainContainer}>
      {isUserConnected ? (
        <IconButton
          style={styles.accountButton}
          icon="account"
          size={20}
          onPress={() => {
            navigation.navigate("Account");
          }}
        />
      ) : (
        <IconButton
          style={styles.accountButton}
          icon="account-question"
          size={20}
          onPress={() => {
            navigation.navigate("Inscription");
          }}
        />
      )}
      <View style={styles.saferTitleContainer}>
        <Text style={styles.saferTitle}>KEEP CALM </Text>

        <Text style={styles.saferTitleTerciary}>
          ...And make a fake call to deter malicious people
        </Text>
      </View>
      <Button onPress={takeVideo}>test</Button>
      <Camera
        style={{ height: 300, width: 300 }}
        ref={(ref) => setCameraRef(ref)}
        type={type}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <AlertButton navigation={navigation} takeVideo={takeVideo} />

      <Footer />
    </View>
  );
}

export default Main;

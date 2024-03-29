/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import { Camera, CameraType } from 'expo-camera';
import {
  Text, View, Pressable, Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Button,
  IconButton,
  Dialog,
  Portal,
  List,
  MD3Colors,
} from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import SVGCarIcon, { SVGCloudOneIcon, SVGCloudTwoIcon, SVGTreeIcon } from '../components/SvgTransform';

import { getUser } from '../../api/user';
import AlertButton from '../components/AlertButton';
import styles from '../../styles/home';
import { getData, storeData } from '../../utils/store';
import Contact from '../components/contact/Contact';

import { ACTIONS } from '../reducer/reducer';
import { Context } from '../context';
import { scenarios } from '../../utils/scenarios';
import { sendRecord } from '../../api/record';
import Footer from '../components/Footer';

function Main({ route, navigation }) {
  const isFocused = useIsFocused();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // const [isRecording, setIsRecording] = useState<boolean>(false);

  const context = useContext(Context);
  const { isAuthenticatedState, isAuthenticatedDispatch } = context;

  const cameraPermisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraRequestPermission = await Camera.requestCameraPermissionsAsync();
    const audioRequestPermission = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    await storeData(
      '@audioPermission',
      audioRequestPermission.status === 'granted',
    );
    await storeData(
      '@cameraPermission',
      cameraRequestPermission.status === 'granted',
    );
  };

  const getUserInfo = async () => {
    const token = await getData('@userToken', 'string');
    const decoded: any = jwt_decode(token);
    return getUser(decoded.user.id, token);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await cameraPermisionFunction();
    })();
  }, []);
  useEffect(() => {
    (async function () {
      const isConnected = await getData('@isConnected');
      if (isConnected && !isAuthenticatedState) {
        isAuthenticatedDispatch(true);
      } else {
        isAuthenticatedDispatch(false);
      }
    }());
  }, [isFocused]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.mainContainer}>
      {isAuthenticatedState ? (
        <IconButton
          style={styles.accountButton}
          icon="account"
          size={20}
          onPress={() => {
            navigation.navigate('Account');
          }}
        />
      ) : (
        <IconButton
          style={styles.accountButton}
          icon="account-question"
          size={20}
          onPress={() => {
            navigation.navigate('Inscription');
          }}
        />
      )}
      <SVGCloudOneIcon style={{ position: 'absolute', top: '10%', right: 20 }} />
      <SVGCloudTwoIcon style={{ position: 'absolute', top: '20%', left: 20 }} />
      <SVGCarIcon style={{
        position: 'absolute', bottom: '10.2%', left: 20, fontSize: '30px', width: 100, height: 100,
      }}
      />
      <SVGTreeIcon style={{
        position: 'absolute', bottom: '11%', right: 20, fontSize: '30px', width: 100, height: 100, strokeWidth: 4,
      }}
      />
      <View style={styles.saferTitleContainer}>
        <Text style={styles.saferTitle}>KEEP CALM </Text>
        <Text style={styles.saferTitleTerciary}>
          ...And make a fake call to deter malicious people
        </Text>
      </View>

      <AlertButton navigation={navigation} />
      <Footer />
    </View>
  );
}

export default Main;

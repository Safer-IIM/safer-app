/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Camera, CameraType } from 'expo-camera';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import jwt_decode from 'jwt-decode';
import { S3 } from 'aws-sdk';
import { Buffer } from 'buffer';
import {
  Text,
  View,
  Pressable,
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
import {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION,
  BUCKET_NAME,
} from '@env';
import { getUser } from '../../api/user';
import AlertButton from '../components/AlertButton';
import styles from '../../styles/home';
import { getData, storeData } from '../../utils/store';
import Contact from './Contact';
import MyComponent from '../components/Footer';
import { generateNameVideo, getVideoContentType } from '../../utils/utils';
import { ACTIONS } from '../reducer/reducer';
import { Context } from '../context';
import { scenarios } from '../../utils/scenarios';

function ScenarioModal({}) {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);

  const handleScenario = (scenario) => {
    setSelectedScenario(scenario);
    setScenarioModalVisible(false);
  };

  return (
    <>
      <Button
        onPress={() => setScenarioModalVisible(true)}
        style={styles.scenarioButton}
        mode="contained"
        icon={selectedScenario.icon}
      >
        {selectedScenario.name}
      </Button>

      <Portal>
        <Dialog
          visible={scenarioModalVisible}
          onDismiss={() => setScenarioModalVisible(false)}
        >
          <Dialog.Title style={{ textAlign: 'center' }}>
            Choisissez un Scénario
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ textAlign: 'center' }}>
              Chaque scénario correspond à un appel différent
            </Text>
          </Dialog.Content>
          <View style={styles.scenarioModalContent}>
            <View style={styles.scenarioList}>
              {scenarios.map((scenario, index) => (
                <List.Item
                  key={index}
                  titleStyle={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: MD3Colors.primary40,
                  }}
                  descriptionStyle={{ fontSize: 12 }}
                  style={styles.scenarioChoiceButton}
                  onPress={() => {
                    handleScenario(scenario);
                  }}
                  title={scenario.name}
                  description={scenario.description}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={scenario.icon}
                      style={{ alignSelf: 'center' }}
                      color={MD3Colors.primary40}
                    />
                  )}
                />
              ))}
            </View>
          </View>
        </Dialog>
      </Portal>
    </>
  );
}

function ContactModal({}) {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactModalInfoVisible, setContactModalInfoVisible] = useState(false);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    getData('contactList')
      .then((res) => {
        console.log('res contact', res);
        res && setContactList(res.contacts);
      })
      .catch((err) => {
        console.log('err contact', err);
      });
  }, []);

  return (
    <>
      <Pressable
        style={styles.contactButton}
        onPress={() => setContactModalVisible(true)}
      >
        <Text style={styles.contactButtonText}>Contact</Text>
      </Pressable>
      <Portal>
        <Dialog
          visible={contactModalVisible}
          onDismiss={() => setContactModalVisible(false)}
        >
          <Dialog.Title
            style={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Modifiez vos contacts
            <IconButton
              icon="information"
              selected
              size={24}
              onPress={() => setContactModalInfoVisible(true)}
            />
            <Portal>
              <Dialog
                visible={contactModalInfoVisible}
                onDismiss={() => setContactModalInfoVisible(false)}
              >
                <Dialog.Title>Infos</Dialog.Title>
                <Dialog.Content>
                  <Text>
                    Ces contacts seront réélement appelé ou notifié si vous
                    cliquez sur le bouton d'urgence durant un faux appel
                  </Text>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </Dialog.Title>
          <Dialog.Content>
            <Contact contactList={contactList} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
}

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

  const isRecordingContext = useContext(Context);
  const { isRecordingState, isRecordingDispatch } = isRecordingContext;

  const s3 = new S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });

  const cameraPermisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraRequestPermission = await Camera.requestCameraPermissionsAsync();
    const audioRequestPermission = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    setAudioPermission(audioRequestPermission.status === 'granted');
    setCameraPermission(cameraRequestPermission.status === 'granted');
  };

  const getUserInfo = async () => {
    const token = await getData('@userToken', 'string');
    const decoded: any = jwt_decode(token);
    return getUser(decoded.user.id, token);
  };

  async function takeVideo() {
    if (cameraPermission) {
      if (isRecordingState) {
        console.log('already recording');
      } else {
        console.log('[recording]');
        isRecordingDispatch({ type: ACTIONS.RECORDING });
        if (cameraRef && isCameraReady) {
          const recordData = await cameraRef.recordAsync({
            maxDuration: 5,
          });
          const { exists, uri } = await FileSystem.getInfoAsync(recordData.uri);

          if (exists) {
            const videoContent = await FileSystem
              .readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            console.log('[buffering ...]');
            const buffer = Buffer.from(videoContent, FileSystem.EncodingType.Base64);
            const uploadParams = {
              Bucket: BUCKET_NAME,
              Key: `${generateNameVideo()}.${uri.split('.')[1]}`,
              Body: buffer,
              ContentType: await getVideoContentType(uri),
            };
            console.log('[uploading to aws...]');
            s3.upload(uploadParams, (err: any, responseAws: any) => {
              isRecordingDispatch({ type: ACTIONS.STOP_RECORDING });
              if (err) {
                console.log('Error while uploading the video :', err);
              } else {
                console.log('Video successfully uploaded :', responseAws);
              }
            });
          } else {
            console.error('Error file does not exists');
          }
        } else {
          console.log('pas de camera');
        }
      }
    }
  }

  useEffect(() => {
    if (cameraRef && cameraRef.current) {
      if (!isRecordingState) {
        console.log('[cameraRef stopping recording]');
        cameraRef.stopRecording();
      }
    }
  }, [isRecordingState]);

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
      const fromLoginPage = await getData('@fromLoginPage');
      if (isFocused && (!isConnected || fromLoginPage)) {
        getUserInfo()
          .then((res) => {
            storeData('@fromLoginPage', false);
            storeData('@userInfo', res.data);
            storeData('@isConnected', true);
            setIsUserConnected(true);
          })
          .catch((err) => {
            storeData('@fromLoginPage', false);
            setIsUserConnected(false);
            storeData('@isConnected', false);
          });
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
      {isUserConnected ? (
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
      <View style={styles.saferTitleContainer}>
        <Text style={styles.saferTitle}>KEEP CALM </Text>

        <Text style={styles.saferTitleTerciary}>
          ...And make a fake call to deter malicious people
        </Text>
      </View>

      <Camera
        ref={(ref) => setCameraRef(ref)}
        type={type}
        ratio="16:9"
        onCameraReady={() => setIsCameraReady(true)}
      />
      <AlertButton navigation={navigation} takeVideo={takeVideo} />

      <View style={styles.footerContainer}>
        <ContactModal />
        <ScenarioModal />
      </View>
    </View>
  );
}

export default Main;

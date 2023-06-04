/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { Audio } from "expo-av";
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from "jwt-decode";
import {
  Animated,
  Text,
  View,
  Linking,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  Button,
  IconButton,
  Dialog,
  Portal,
  List,
  MD3Colors,
  Tooltip,
} from "react-native-paper";
import { getUser } from "../../api/user";
import AlertButton from "../components/AlertButton";
import styles from "../../styles/home";
import { getData, storeData } from "../../utils/store";
import Contact from "./Contact";

const scenarios = [
  {
    id: 1,
    icon: "party-popper",
    name: "Soirée",
    description:
      "Eidan vous appelle depuis une soirée parce que vous etes en retard  ",
  },
  {
    id: 2,
    icon: "home",
    name: "Maison",
    description:
      "Votre frere Eidan vous appelle, parce que votre mere s'inquiete de pas vous voir",
  },
  {
    id: 3,
    icon: "cake",
    name: "Anniversaire",
    description:
      "Eidan vous appelle depuis l'anniversaire de Sarah, parce que vous n'etes pas encore arrivé",
  },
];
function Main({ route, navigation }) {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);

  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const isFocused = useIsFocused();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [recording, setRecording] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const getUserInfo = new Promise(async (resolve, reject) => {
    let decoded: any;
    try {
      if (route?.params) {
        decoded = jwt_decode(route.params.userToken);
      }
      const token = await getData("@userToken", "string");
      decoded = jwt_decode(token);
      resolve("success");
    } catch (err) {
      reject(err);
    }
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await cameraPermisionFunction();
    })();
  }, []);

  const cameraPermisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const audioPermission = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    setAudioPermission(audioPermission.status === "granted");
    setCameraPermission(cameraPermission.status === "granted");
  };

  useEffect(() => {
    (async function () {
      const isConnected = await getData("@isConnected");
      const fromLoginPage = await getData("@fromLoginPage");
      if (isFocused && (!isConnected || fromLoginPage)) {
        getUserInfo
          .then((res) => {
            storeData("@fromLoginPage", false);
            console.log("test");
            setIsUserConnected(true);
            storeData("@userInfo", res);
            storeData("@isConnected", true);
          })
          .catch((err) => {
            storeData("@fromLoginPage", false);
            console.log("test 2");
            setIsUserConnected(false);
            storeData("@isConnected", false);
          });
      }
    })();
  }, [isFocused]);

  const handleScenario = (scenario) => {
    setSelectedScenario(scenario);
    setScenarioModalVisible(false);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleRecord = async () => {
    if (!recording) {
      setRecording(true);
      let video = await cameraRef.recordAsync();
      console.log("video", video);
    } else {
      setRecording(false);
      cameraRef.stopRecording();
    }
  };
  return (
    <View style={styles.mainContainer}>
      {/*    <Camera
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
   
        <View>
          <TouchableOpacity onPress={toggleCameraType}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      */}

      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => {
          handleRecord();
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderRadius: 25,
            borderColor: "red",
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderRadius: 25,
              borderColor: "red",
              height: 40,
              width: 40,
              backgroundColor: "red",
            }}
          ></View>
        </View>
      </TouchableOpacity>

      <ContactModal />

      {/*
      <Pressable onPress={() => Linking.openURL(`tel:911`)}>
        <Text>Call 911</Text>
      </Pressable>
      <Text>{text}</Text>
  */}

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
      <AlertButton navigation={navigation} />
      <Portal>
        <Dialog
          visible={scenarioModalVisible}
          onDismiss={() => setScenarioModalVisible(false)}
        >
          <Dialog.Title style={{ textAlign: "center" }}>
            Choisissez un Scénario
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ textAlign: "center" }}>
              Chaque scénario correspond à un appel différent
            </Text>
          </Dialog.Content>
          <View style={styles.scenarioModalContent}>
            <View style={styles.scenarioList}>
              {scenarios.map((scenario, index) => (
                <List.Item
                  key={index}
                  titleStyle={{
                    fontWeight: "bold",
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
                      style={{ alignSelf: "center" }}
                      color={MD3Colors.primary40}
                    />
                  )}
                />
              ))}
            </View>
            <Button style={styles.scenarioAddingButton} mode="contained">
              Ajouter un scénario
            </Button>
          </View>
        </Dialog>
      </Portal>
      <Button
        onPress={() => setScenarioModalVisible(true)}
        style={styles.scenarioButton}
        mode="contained"
        icon={selectedScenario.icon}
      >
        {selectedScenario.name}
      </Button>
    </View>
  );
}

export default Main;

const ContactModal = ({}) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactModalInfoVisible, setContactModalInfoVisible] = useState(false);
  return (
    <>
      <Button
        style={styles.contactButton}
        onPress={() => setContactModalVisible(true)}
        mode="contained"
        icon="phone"
      >
        Contact
      </Button>

      <Portal>
        <Dialog
          visible={contactModalVisible}
          onDismiss={() => setContactModalVisible(false)}
        >
          <Dialog.Title
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
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
                    qdzqzdq qdqzddq
                  </Text>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </Dialog.Title>
          <Dialog.Content>
            <Contact contacts={[]} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

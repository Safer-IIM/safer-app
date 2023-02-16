/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from 'jwt-decode';
import {
  Animated, Image, Text, View,
} from 'react-native';
import {
  Button, IconButton, Dialog, Portal, List, MD3Colors,
} from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import Svg from 'react-native-svg';
import { getUser } from '../../api/user';
import AlertButton from '../components/AlertButton';
import styles from '../../styles/home';
import { getData, storeData } from '../../utils/store';

const scenarios = [
  {
    id: 1, icon: 'party-popper', name: 'Soirée', description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    id: 2, icon: 'home', name: 'Maison', description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    id: 3, icon: 'cake', name: 'Anniversaire', description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  }];
function Main({ route, navigation }) {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);

  const getUserInfo = async () => {
    if (route?.params) {
      const decoded: any = jwt_decode(route.params.userToken);
      return getUser(decoded.user.id, route.params.userToken);
    }

    const token = await getData('@userToken', 'string');
    const decoded = jwt_decode(token);
    return getUser(decoded.user.id, token);
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      setIsUserConnected(true);
      console.log('test');
    }).catch((err) => {
      console.log('err');
      setIsUserConnected(false);
    });
  }, []);

  const handleScenario = (scenario) => {
    setSelectedScenario(scenario);
    setScenarioModalVisible(false);
  };

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
      <AlertButton navigation={navigation} />
      <Portal>
        <Dialog visible={scenarioModalVisible} onDismiss={() => setScenarioModalVisible(false)}>
          <Dialog.Title style={{ textAlign: 'center' }}>Choisissez un Scénario</Dialog.Title>
          <Dialog.Content>
            <Text style={{ textAlign: 'center' }} variant="bodyMedium">Chaque scénario correspond à un appel différent</Text>
          </Dialog.Content>
          <View style={styles.scenarioModalContent}>
            <View style={styles.scenarioList}>
              {
                  scenarios.map((scenario, index) => (
                    <List.Item
                      key={index}
                      titleStyle={{ fontWeight: 'bold', fontSize: 18, color: MD3Colors.primary40 }}
                      descriptionStyle={{ fontSize: 12 }}
                      style={styles.scenarioChoiceButton}
                      onPress={() => {
                        handleScenario(scenario);
                      }}
                      title={scenario.name}
                      description={scenario.description}
                      left={(props) => <List.Icon {...props} icon={scenario.icon} style={{ alignSelf: 'center' }} color={MD3Colors.primary40} />}
                    />
                  ))
              }
            </View>
            <Button style={styles.scenarioAddingButton} mode="contained">Ajouter un scénario</Button>
          </View>
        </Dialog>
      </Portal>
      <Button onPress={() => setScenarioModalVisible(true)} style={styles.scenarioButton} mode="contained" icon={selectedScenario.icon}>{selectedScenario.name}</Button>
    </View>

  );
}

export default Main;

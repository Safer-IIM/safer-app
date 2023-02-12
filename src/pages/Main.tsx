/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from 'jwt-decode';
import { Text, View } from 'react-native';
import {
  Button, IconButton, Dialog, Portal,
} from 'react-native-paper';
import { getUser } from '../../api/user';
import AlertButton from '../components/AlertButton';
import styles from '../../styles/home';
import { getData, storeData } from '../../utils/store';

const scenarios = [
  { id: 1, icon: 'party-popper', name: 'Soirée' },
  { id: 2, icon: 'home', name: 'Maison' },
  { id: 3, icon: 'cake', name: 'Anniversaire' }];
function Main({ route, navigation }) {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);

  useEffect(() => {
    if (route?.params) {
      const decoded: any = jwt_decode(route.params.userToken);
      getUser(decoded.user.id, route.params.userToken)
        .then((res) => {
          setIsUserConnected(true);
          return res;
        })
        .catch((err) => err);
    }
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
          <Dialog.Actions style={styles.scenarioList}>
            {
                  scenarios.map((scenario) => (
                    <Button
                      style={styles.scenarioChoiceButton}
                      onPress={() => {
                        handleScenario(scenario);
                      }}
                      mode="outlined"
                      icon={scenario.icon}
                    >
                      {scenario.name}
                    </Button>
                  ))
              }
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button onPress={() => setScenarioModalVisible(true)} style={styles.scenarioButton} mode="contained" icon={selectedScenario.icon}>{selectedScenario.name}</Button>
    </View>

  );
}

export default Main;

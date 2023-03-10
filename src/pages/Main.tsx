/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from 'jwt-decode';
import { Animated, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Button, IconButton, Dialog, Portal, List, MD3Colors,
} from 'react-native-paper';
import { getUser } from '../../api/user';
import AlertButton from '../components/AlertButton';
import styles from '../../styles/home';
import { getData, storeData } from '../../utils/store';

const scenarios = [
  {
    id: 1, icon: 'party-popper', name: 'Soirée', description: 'Eidan vous appelle depuis une soirée parce que vous etes en retard  ',
  },
  {
    id: 2, icon: 'home', name: 'Maison', description: 'Votre frere Eidan vous appelle, parce que votre mere s\'inquiete de pas vous voir',
  },
  {
    id: 3, icon: 'cake', name: 'Anniversaire', description: 'Eidan vous appelle depuis l\'anniversaire de Sarah, parce que vous n\'etes pas encore arrivé',
  }];
function Main({ route, navigation }) {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const isFocused = useIsFocused();

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
    (async function () {
      const isConnected = await getData('@isConnected');
      const fromLoginPage = await getData('@fromLoginPage');
      if (isFocused && (!isConnected || fromLoginPage)) {
        getUserInfo().then((res) => {
          storeData('@fromLoginPage', false);
          console.log('test');
          setIsUserConnected(true);
          storeData('@userInfo', res);
          storeData('@isConnected', true);
        }).catch((err) => {
          storeData('@fromLoginPage', false);
          console.log('test 2');
          setIsUserConnected(false);
          storeData('@isConnected', false);
        });
      }
    }());
  }, [isFocused]);

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

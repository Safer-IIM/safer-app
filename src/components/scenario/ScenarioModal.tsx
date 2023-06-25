import React, { useState } from 'react';
import {
  Dialog, List, MD3Colors, Portal,
} from 'react-native-paper';
import { Pressable, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { scenarios } from '../../../utils/scenarios';
import styles from '../../../styles/home';

function ScenarioModal({}) {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);

  const handleScenario = (scenario) => {
    setSelectedScenario(scenario);
    setScenarioModalVisible(false);
  };

  return (
    <>

      <Pressable
        onPress={() => setScenarioModalVisible(true)}
        style={styles.scenarioButton}
      >

        <AntDesign name="contacts" size={32} color="black" />
        <Text>
          {selectedScenario.name}
        </Text>
      </Pressable>

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
export default ScenarioModal;
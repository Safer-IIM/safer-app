import React, { useContext, useState } from 'react';
import {
  Dialog, List, MD3Colors, Portal,
} from 'react-native-paper';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { scenarios } from '../../../utils/scenarios';
import styles from '../../../styles/home';
import { Context } from '../../context';

function ScenarioModal({}) {
  const context = useContext(Context);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);

  const handleScenario = (scenario) => {
    setSelectedScenario(scenario);
    context.scenarioDispatch(scenario);
    setScenarioModalVisible(false);
  };

  return (
    <>

      <Pressable
        onPress={() => setScenarioModalVisible(true)}
        style={styles.scenarioButton}
      >

        <MaterialCommunityIcons
          style={styles.scenarioButtonIcon}
          name={context.scenarioState.icon}
          size={32}
          color="black"
        />
        <Text style={styles.scenarioButtonText}>
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
                  titleStyle={styles.scenarioListTitle}
                  descriptionStyle={{ fontSize: 12 }}
                  style={[styles.scenarioChoiceButton, scenario.id === selectedScenario.id && styles.selectedScenario]}
                  onPress={() => {
                    handleScenario(scenario);
                  }}
                  title={scenario.name}
                  description={scenario.description}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={scenario.icon}
                      style={styles.scenarioListIcon}
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

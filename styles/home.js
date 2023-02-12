import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',

    justifyContent: 'center',
  },
  accountButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
  },
  alertButton: {
    fontWeight: 'bold',
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scenarioButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  scenarioList: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  scenarioChoiceButton: {
    borderWidth: 5,
    borderRadius: 30,
    margin: 7,
    width: '100%',
  },
});

export default styles;

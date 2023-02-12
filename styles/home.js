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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scenarioChoiceButton: {
    marginTop: 10,
    width: '50%',
  },
});

export default styles;

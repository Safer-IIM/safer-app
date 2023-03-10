import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'white',
  },
  alertButton: {
    fontWeight: 'bold',
    backgroundColor: 'red',
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
  scenarioModalContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  scenarioList: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  scenarioChoiceButton: {
    borderWidth: 5,
    borderRadius: 30,
    margin: 7,
    width: '100%',
    paddingLeft: 10,
  },
  scenarioAddingButton: {
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import globalStyle from './variables';

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
  saferTitleContainer: {
    width: '90%',
  },
  saferTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    color: globalStyle.colorDanger,
  },
  saferTitleSecondary: {
    textAlign: 'center',
    fontSize: 14,
  },
  saferTitleTerciary: {
    textAlign: 'center',
    fontSize: 14,
    color: '#242424',
  },
  alertButton: {
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 20,
    position: 'relative',
    backgroundColor: globalStyle.colorDanger,
    height: 150,
    width: 150,
    borderRadius: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  scenarioButton: {
    justifyContent: 'center',
    alignItems: 'center',
    color: globalStyle.colorPrimary,
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
  scenarioAddingButton: {},

  contactButton: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  contactButtonText: {
    color: globalStyle.colorPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  contactButtonIcon: {
    color: globalStyle.colorPrimary,
  },
  scenarioButtonText: {
    color: globalStyle.colorPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  scenarioButtonIcon: {
    color: globalStyle.colorPrimary,
  },
});

export default styles;

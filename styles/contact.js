import { StyleSheet } from 'react-native';
import globalStyle from './variables';

const styles = StyleSheet.create({
  contactContainer: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,

  },
  listContainer: {
    width: '100%',
    height: 'auto',
    maxHeight: '90%',
  },
  item: {
    marginTop: 10,
    padding: 10,
    backgroundColor: globalStyle.colorSecondarySemiVisible,
    borderRadius: 10,
  },
  itemMail: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  itemPhone: {
    flexDirection: 'row',
  },
  addContactButtonContainer: {

    height: '10%',
    justifyContent: 'center',
  },
  addContactButton: {

    borderWidth: 3,
  },
  contactInput: {
    marginBottom: 20,
  },
});

export default styles;

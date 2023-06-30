import { StyleSheet } from 'react-native';
import globalStyle from './variables';

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  listContainer: {
    maxHeight: '50%',
    width: '100%',
  },
  item: {
    marginTop: 10,
    padding: 10,
    backgroundColor: globalStyle.colorSecondarySemiVisible,
    borderRadius: 10,
  },
  itemMail: {
    flexDirection: 'row',
  },
  itemPhone: {
    flexDirection: 'row',
  },

  addContactButtons: {
    margin: 'auto',
    borderWidth: 3,
  },
  contactInput: {
    marginBottom: 20,
  },
});

export default styles;

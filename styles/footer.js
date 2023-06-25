import { StyleSheet } from 'react-native';
import globalStyle from './variables';

const styles = StyleSheet.create(
  {
    footerContainer: {
      position: 'absolute',
      bottom: 10,
      paddingRight: 100,
      paddingLeft: 100,
      height: '11%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      backgroundColor: globalStyle.colorPrimarySemiVisible,
    },
  },
);

export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  callPageContainer: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  resumeButton: {
    position: 'absolute',
    bottom: 300,
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
  },
  hangUpButton: {
    position: 'absolute',
    bottom: 50,
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
  },

});

export default styles;

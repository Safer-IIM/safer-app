import * as React from 'react';
import { View } from 'react-native';

import styles from '../../styles/footer';

import ContactModal from './contact/ContactModal';
import ScenarioModal from './scenario/ScenarioModal';

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <ContactModal />
      <ScenarioModal />
    </View>
  );
}

export default Footer;

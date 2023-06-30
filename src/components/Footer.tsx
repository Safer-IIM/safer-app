import * as React from 'react';
import { View } from 'react-native';

import styles from '../../styles/footer';
import SVGCarIcon from './SvgTransform';
import CarIcon from '../assets/car_icon.svg';

import ContactModal from './contact/ContactModal';
import ScenarioModal from './scenario/ScenarioModal';

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <SVGCarIcon />
      <ContactModal />
      <ScenarioModal />
    </View>
  );
}

export default Footer;

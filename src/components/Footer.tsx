import * as React from "react";
import { View } from "react-native";
import SVGCarIcon from "./SvgTransform";
import ContactModal from "./contact/ContactModal";
import ScenarioModal from "./scenario/ScenarioModal";
import styles from "../../styles/footer";

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <ContactModal />
      <ScenarioModal />
    </View>
  );
}

export default Footer;

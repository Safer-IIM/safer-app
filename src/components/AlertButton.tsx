/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import styles from "../../styles/home";

function AlertButton({ navigation }) {
  return (
    <View>
      <Button
        style={styles.alertButton}
        mode="contained"
        onPress={() => console.log("Pressed")}
        textColor={"red"}
        uppercase={true}
      >
        Alerte
      </Button>
    </View>
  );
}

export default AlertButton;

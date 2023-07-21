/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef } from "react";
import { Animated, View, Text, Pressable } from "react-native";
import { Button } from "react-native-paper";
import styles from "../../styles/home";

function AlertButton({ navigation }) {
  const breathWidthAnim = useRef(new Animated.Value(1)).current;
  const breathHeightAnim = useRef(new Animated.Value(1)).current;
  function breathAnimation() {
    const biggerSize = Animated.parallel([
      Animated.timing(breathWidthAnim, {
        toValue: 1.1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(breathHeightAnim, {
        toValue: 1.1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);
    const smallerSize = Animated.parallel([
      Animated.timing(breathWidthAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(breathHeightAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(Animated.sequence([biggerSize, smallerSize]), -1).start();
  }
  useEffect(() => {
    breathAnimation();
  }, [breathWidthAnim]);
  return (
    <View>
      <Animated.View>
        <Pressable
          style={[styles.alertButton]}
          onPress={() => {
            navigation.navigate("Call");
          }}
        >
          <Text style={styles.alertButtonTitle}>SAFERIZE</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default AlertButton;

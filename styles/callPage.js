import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  callPageContainer: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  resumeButton: {
    height: 69,
    width: 69,
    borderRadius: 100,
    justifyContent: "center",
  },
  hangUpButton: {
    backgroundColor: "red",
    height: 69,
    width: 69,
    borderRadius: 100,
    justifyContent: "center",
  },
  emergencyButton: {
    position: "absolute",
    bottom: "2%",
    right: "3%",
  },
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  accountButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
  },
  alertButton: {
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  alertButtonLabel: {
    paddingTop: 40,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 40,
  },
});

export default styles;

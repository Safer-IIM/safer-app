import { StyleSheet } from "react-native";
import globalStyle from "./variables";

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  accountButton: {
    position: "absolute",
    top: 20,
    right: 10,
    backgroundColor: "white",
  },
  saferTitleContainer: {
    width: "90%",
  },
  saferTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
    color: globalStyle.colorDanger,
  },
  saferTitleSecondary: {
    textAlign: "center",
    fontSize: 14,
  },
  saferTitleTerciary: {
    textAlign: "center",
    fontSize: 14,
    color: "#242424",
  },
  alertButton: {
    marginTop: 20,
    position: "relative",
    backgroundColor: globalStyle.colorDanger,
    height: 150,
    width: 150,
    borderRadius: 100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  alertButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  footerContainer: {
    position: "absolute",
    bottom: 10,

    backgroundColor: "green",
    height: "11%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: globalStyle.colorPrimarySemiVisible,
  },

  scenarioButton: {
    backgroundColor: globalStyle.colorPrimary,
    right: 20,
  },
  scenarioModalContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  scenarioList: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  scenarioChoiceButton: {
    borderWidth: 5,
    borderRadius: 30,
    margin: 7,
    width: "100%",
    paddingLeft: 10,
  },
  scenarioAddingButton: {},

  contactButton: {
    left: 20,
  },
  contactButtonText: {
    color: globalStyle.colorPrimary,
    fontSize: 15,
  },
});

export default styles;

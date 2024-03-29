import { StyleSheet } from "react-native";
import globalStyle from "./variables";

const styles = StyleSheet.create({
  contactContainer: {
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    maxHeight: "95%",
  },
  listContainer: {
    width: "100%",
    height: "auto",
  },
  item: {
    marginTop: 10,
    padding: 10,
    backgroundColor: globalStyle.colorPrimarySemiVisible,
    borderRadius: 30,
    justifyContent: "center",
  },
  itemMail: {
    alignItems: "center",
    flexDirection: "row",
  },
  itemPhone: {
    flexDirection: "row",
  },
  addContactButtonContainer: {
    marginTop: 10,
    justifyContent: "center",
  },
  addContactButton: {
    color: globalStyle.colorPrimary,
  },
  contactInput: {
    marginBottom: 20,
  },
});

export default styles;
